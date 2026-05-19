from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from tool_registry.app.core.database import get_db
from tool_registry.app.schemas.herramienta_schema import HerramientaCreate, HerramientaUpdate
from tool_registry.app.services.herramienta_service import HerramientaService

router = APIRouter(prefix="/herramientas", tags=["Herramientas"])


@router.get("/para-orquestador")
async def listar_para_orquestador(session: AsyncSession = Depends(get_db)):
    return await HerramientaService.listar_para_orquestador(session)


@router.get("/")
async def listar_herramientas(session: AsyncSession = Depends(get_db)):
    return await HerramientaService.listar_herramientas(session)


@router.get("/{nombre}")
async def obtener_herramienta(nombre: str, session: AsyncSession = Depends(get_db)):
    return await HerramientaService.obtener_herramienta(session, nombre)


@router.post("/")
async def crear_herramienta(data: HerramientaCreate, session: AsyncSession = Depends(get_db)):
    herramienta_id = await HerramientaService.crear_herramienta(session, data)
    return {"message": "herramienta creada", "herramienta_id": herramienta_id}


@router.put("/{nombre}")
async def actualizar_herramienta(
    nombre: str,
    data: HerramientaUpdate,
    session: AsyncSession = Depends(get_db)
):
    herramienta = await HerramientaService.actualizar_herramienta(session, nombre, data)
    return {"message": "herramienta actualizada", "herramienta": herramienta}
