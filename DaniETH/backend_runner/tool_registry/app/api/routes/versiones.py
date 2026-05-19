from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from tool_registry.app.core.database import get_db
from tool_registry.app.schemas.version_schema import VersionCreate
from tool_registry.app.services.version_service import VersionService

router = APIRouter(prefix="/herramientas", tags=["Versiones"])


@router.get("/{nombre}/versiones/fallback")
async def obtener_fallback(nombre: str, session: AsyncSession = Depends(get_db)):
    fallback = await VersionService.obtener_fallback(session, nombre)
    if not fallback:
        return {"message": "no hay version de fallback disponible"}
    return fallback


@router.get("/{nombre}/versiones")
async def listar_versiones(nombre: str, session: AsyncSession = Depends(get_db)):
    return await VersionService.listar_versiones(session, nombre)


@router.post("/{nombre}/versiones")
async def agregar_version(
    nombre: str,
    data: VersionCreate,
    session: AsyncSession = Depends(get_db)
):
    version_id = await VersionService.agregar_version(session, nombre, data)
    return {"message": "version agregada", "version_id": version_id}


@router.put("/{nombre}/versiones/{version}/activar")
async def activar_version(
    nombre: str,
    version: str,
    session: AsyncSession = Depends(get_db)
):
    version_id = await VersionService.activar_version(session, nombre, version)
    return {"message": "version activada", "version_id": version_id}
