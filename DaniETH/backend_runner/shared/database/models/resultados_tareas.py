from sqlalchemy import Column, BigInteger, Text, TIMESTAMP, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.sql import func
from shared.database.base import Base


class ResultadoTarea(Base):
    __tablename__ = "resultados_tareas"

    id = Column(BigInteger, primary_key=True)
    tarea_id = Column(BigInteger, ForeignKey("tareas_escaneo.id"))
    raw_output = Column(Text)
    json_output = Column(JSONB)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)
