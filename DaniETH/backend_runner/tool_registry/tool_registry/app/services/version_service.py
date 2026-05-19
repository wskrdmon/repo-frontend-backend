from sqlalchemy.ext.asyncio import AsyncSession
from tool_registry.app.repositories.herramienta_repository import HerramientaRepository
from tool_registry.app.repositories.version_repository import VersionRepository
from tool_registry.app.core.exceptions import NotFoundException, ConflictException


class VersionService:

    @staticmethod
    async def agregar_version(session: AsyncSession, nombre_herramienta: str, data):
        herramienta = await HerramientaRepository.obtener_por_nombre(session, nombre_herramienta)
        if not herramienta:
            raise NotFoundException(detail=f"Herramienta '{nombre_herramienta}' no encontrada")

        existente = await VersionRepository.obtener_por_herramienta_y_version(
            session, herramienta.id, data.version
        )
        if existente:
            raise ConflictException(
                detail=f"La versión '{data.version}' ya existe para '{nombre_herramienta}'"
            )

        version_id = await VersionRepository.crear(
            session=session,
            id_herramienta=herramienta.id,
            version=data.version,
            docker_imagen=data.docker_imagen,
            notas_version=data.notas_version
        )
        return version_id

    @staticmethod
    async def activar_version(session: AsyncSession, nombre_herramienta: str, version_str: str):
        herramienta = await HerramientaRepository.obtener_por_nombre(session, nombre_herramienta)
        if not herramienta:
            raise NotFoundException(detail=f"Herramienta '{nombre_herramienta}' no encontrada")

        version = await VersionRepository.obtener_por_herramienta_y_version(
            session, herramienta.id, version_str
        )
        if not version:
            raise NotFoundException(detail=f"Versión '{version_str}' no encontrada")

        await VersionRepository.desactivar_todas(session, herramienta.id)
        await VersionRepository.activar(session, version.id)
        await HerramientaRepository.actualizar_version_activa(
            session=session,
            herramienta_id=herramienta.id,
            version_id=version.id,
            version_str=version_str
        )
        return version.id

    @staticmethod
    async def listar_versiones(session: AsyncSession, nombre_herramienta: str):
        herramienta = await HerramientaRepository.obtener_por_nombre(session, nombre_herramienta)
        if not herramienta:
            raise NotFoundException(detail=f"Herramienta '{nombre_herramienta}' no encontrada")
        return await VersionRepository.obtener_versiones_de_herramienta(session, herramienta.id)

    @staticmethod
    async def obtener_fallback(session: AsyncSession, nombre_herramienta: str):
        herramienta = await HerramientaRepository.obtener_por_nombre(session, nombre_herramienta)
        if not herramienta:
            raise NotFoundException(detail=f"Herramienta '{nombre_herramienta}' no encontrada")
        return await VersionRepository.obtener_fallback(session, herramienta.id)
