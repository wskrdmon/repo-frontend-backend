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

    resultado = subprocess.run(cmd, capture_output=True, text=True, timeout=300)

    texto = resultado.stdout
    texto_lower = texto.lower()

    vulnerable = any([
        "is vulnerable" in texto_lower,
        "sqlmap identified" in texto_lower,
        "injectable" in texto_lower,
        ("parameter:" in texto_lower and "type:" in texto_lower),
        ("parameter:" in texto_lower and "payload:" in texto_lower),
    ])

    inyecciones = []
    capturando = False
    for linea in texto.splitlines():
        stripped = linea.strip()
        if stripped.startswith("Parameter:"):
            capturando = True
        if capturando and stripped:
            inyecciones.append(stripped)
        if capturando and not stripped:
            capturando = False

    output = {
        "url": url,
        "resultado": {
            "vulnerable": vulnerable,
            "inyecciones_detectadas": inyecciones,
            "raw_output": texto[-3000:] if len(texto) > 3000 else texto
        },
        "codigo_salida": resultado.returncode,
        "error": resultado.stderr if resultado.returncode != 0 else None
    }

    print(json.dumps(output))


if __name__ == "__main__":
    main()
