import sys
import json
import subprocess


def main():
    params = json.loads(sys.argv[1])

    url = params["url"]
    parametro = params.get("parametro", "")
    nivel = params.get("nivel", 1)
    data = params.get("data", "")
    solo_deteccion = params.get("solo_deteccion", True)

    cmd = [
        "python", "/sqlmap/sqlmap.py",
        "-u", url,
        "--level", str(nivel),
        "--batch",
        "--output-dir", "/tmp/sqlmap_output"
    ]
    if parametro:
        cmd.extend(["-p", parametro])
    if data:
        cmd.extend(["--data", data])
    if solo_deteccion:
        cmd.append("--technique=B")  # solo boolean-based, menos invasivo

    resultado = subprocess.run(cmd, capture_output=True, text=True, timeout=300)

    texto = resultado.stdout
    vulnerable = "is vulnerable" in texto or "sqlmap identified" in texto.lower()

    inyecciones = []
    for linea in texto.splitlines():
        linea = linea.strip()
        if "Parameter:" in linea or "Type:" in linea or "Payload:" in linea:
            inyecciones.append(linea)

    output = {
        "url": url,
        "resultado": {
            "vulnerable": vulnerable,
            "inyecciones_detectadas": inyecciones,
            "resumen": texto.split("---")[-1].strip() if "---" in texto else ""
        },
        "codigo_salida": resultado.returncode,
        "error": resultado.stderr if resultado.returncode != 0 else None
    }

    print(json.dumps(output))


if __name__ == "__main__":
    main()
