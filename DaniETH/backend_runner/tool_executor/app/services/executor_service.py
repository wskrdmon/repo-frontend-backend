import asyncio
import json
import time

import httpx

from shared.database.session import SessionLocal
from tool_executor.app.core.config import TOOL_REGISTRY_URL
from tool_executor.app.core.exceptions import NotFoundException, ToolExecutionException
from tool_executor.app.repositories.tarea_repository import TareaRepository, ResultadoRepository


class ExecutorService:

    @staticmethod
    async def lanzar_container(docker_imagen: str, params: dict, timeout: int = 300):
        params_json = json.dumps(params)
        inicio = time.time()

        proceso = await asyncio.create_subprocess_exec(
            "docker", "run", "--rm", docker_imagen, params_json,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )

        try:
            stdout, stderr = await asyncio.wait_for(proceso.communicate(), timeout=timeout)
        except asyncio.TimeoutError:
            proceso.kill()
            raise ToolExecutionException(detail="El container superó el tiempo límite de ejecución")

        duracion = int(time.time() - inicio)
        return stdout.decode(), stderr.decode(), proceso.returncode, duracion

    @staticmethod
    async def ejecutar_en_background(
        tarea_id: int,
        docker_imagen: str,
        params: dict,
        fallback_imagen: str = None,
        fallback_version_id: int = None
    ):
        async with SessionLocal() as session:
            try:
                await TareaRepository.actualizar_corriendo(session, tarea_id)

                stdout, stderr, codigo_salida, duracion = await ExecutorService.lanzar_container(
                    docker_imagen, params
                )

                fallback_usado = False
                version_fallback_id = None

                # Si falló y hay fallback, intentar con la versión anterior
                if codigo_salida != 0 and fallback_imagen:
                    stdout, stderr, codigo_salida, duracion = await ExecutorService.lanzar_container(
                        fallback_imagen, params
                    )
                    fallback_usado = True
                    version_fallback_id = fallback_version_id

                # Parsear output
                try:
                    json_output = json.loads(stdout)
                except Exception:
                    json_output = {"raw": stdout, "error": stderr}

                # Guardar resultado
                await ResultadoRepository.crear(
                    session=session,
                    tarea_id=tarea_id,
                    raw_output=stdout,
                    json_output=json_output
                )

                # Actualizar estado de la tarea
                await TareaRepository.actualizar_completado(
                    session=session,
                    tarea_id=tarea_id,
                    codigo_salida=codigo_salida,
                    duracion=duracion,
                    fallback_usado=fallback_usado,
                    version_fallback_id=version_fallback_id
                )

            except Exception as e:
                await TareaRepository.actualizar_fallido(
                    session=session,
                    tarea_id=tarea_id,
                    mensaje_error=str(e)
                )

    @staticmethod
    async def ejecutar(session, data, background_tasks):
        async with httpx.AsyncClient() as client:
            # Obtener herramienta del registry
            resp = await client.get(f"{TOOL_REGISTRY_URL}/herramientas/{data.herramienta}")
            if resp.status_code == 404:
                raise NotFoundException(detail=f"Herramienta '{data.herramienta}' no encontrada")
            herramienta = resp.json()

            # Obtener versiones
            resp_v = await client.get(f"{TOOL_REGISTRY_URL}/herramientas/{data.herramienta}/versiones")
            versiones = resp_v.json()

            # Obtener fallback
            resp_f = await client.get(f"{TOOL_REGISTRY_URL}/herramientas/{data.herramienta}/versiones/fallback")
            fallback = resp_f.json() if resp_f.status_code == 200 and "id" in resp_f.json() else None

        version_activa = next((v for v in versiones if v.get("activo")), None)
        if not version_activa:
            raise NotFoundException(detail=f"No hay versión activa para '{data.herramienta}'")

        fallback_imagen = fallback.get("docker_imagen") if fallback else None
        fallback_version_id = fallback.get("id") if fallback else None

        # Crear registro de tarea
        tarea_id = await TareaRepository.crear(
            session=session,
            sesion_id=data.sesion_id,
            herramienta=data.herramienta,
            herramienta_id=herramienta["id"],
            version_usada_id=version_activa["id"],
            orden_ejecucion=data.orden_ejecucion,
            input_params=data.params
        )

        # Lanzar container en background — no bloquea la respuesta
        background_tasks.add_task(
            ExecutorService.ejecutar_en_background,
            tarea_id,
            version_activa["docker_imagen"],
            data.params,
            fallback_imagen,
            fallback_version_id
        )

        return tarea_id

    @staticmethod
    async def obtener_tarea(session, tarea_id: int):
        tarea = await TareaRepository.obtener_por_id(session, tarea_id)
        if not tarea:
            raise NotFoundException(detail=f"Tarea {tarea_id} no encontrada")
        resultado = await ResultadoRepository.obtener_por_tarea(session, tarea_id)
        return tarea, resultado
