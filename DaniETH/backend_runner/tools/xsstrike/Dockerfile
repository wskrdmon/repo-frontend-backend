FROM python:3.11-slim
RUN apt-get update && apt-get install -y git && \
    git clone --depth 1 https://github.com/s0md3v/XSStrike.git /xsstrike && \
    pip install --no-cache-dir -r /xsstrike/requirements.txt && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY run.py .
ENTRYPOINT ["python", "run.py"]
