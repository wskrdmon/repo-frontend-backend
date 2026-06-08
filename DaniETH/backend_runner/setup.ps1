# setup.ps1 - Levanta todo el sistema desde cero en cualquier PC
# Uso: .\setup.ps1

Write-Output "=== Construyendo imagenes de herramientas ==="

docker build -t instrumentisto/nmap:7.94 ./tools/nmap/
Write-Output "nmap OK"

docker build -t backend_runner-nuclei:3.1.0 ./tools/nuclei/
Write-Output "nuclei OK"

docker build -t backend_runner-sqlmap:1.8.4 ./tools/sqlmap/
Write-Output "sqlmap OK"

docker build -t backend_runner-xsstrike:3.1.5 ./tools/xsstrike/
Write-Output "xsstrike OK"

Write-Output ""
Write-Output "=== Levantando servicios ==="
docker compose up --build -d

Write-Output ""
Write-Output "=== Sistema listo ==="
Write-Output "tool_registry  -> http://localhost:8003/docs"
Write-Output "tool_executor  -> http://localhost:8004/docs"
