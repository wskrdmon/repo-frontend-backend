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

    output = {
        "raw_output": resultado.stdout,
        "codigo_salida": resultado.returncode,
        "error": resultado.stderr if resultado.returncode != 0 else None
    }

    print(json.dumps(output))


if __name__ == "__main__":
    main()
