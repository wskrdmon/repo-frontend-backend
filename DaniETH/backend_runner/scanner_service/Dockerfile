FROM python:3.11-slim
WORKDIR /app
COPY shared/ ./shared/
COPY scanner_service/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY scanner_service/ ./scanner_service/
CMD ["python", "-m", "scanner_service.app.worker"]
