import sys
import json
import subprocess


def main():
    params = json.loads(sys.argv[1])

    objetivo = params["objetivo"]
    templates = params.get("templates", [])
    severidad = params.get("severidad", [])
    rate_limit = params.get("rate_limit", 150)

    cmd = ["nuclei", "-u", objetivo, "-rate-limit", str(rate_limit), "-json", "-silent"]
    if templates:
        for t in templates:
            cmd.extend(["-t", t])
    if severidad:
        cmd.extend(["-severity", ",".join(severidad)])

    resultado = subprocess.run(cmd, capture_output=True, text=True, timeout=600)

    # nuclei devuelve una línea JSON por vulnerabilidad
    vulnerabilidades = []
    for linea in resultado.stdout.strip().splitlines():
        try:
            vulnerabilidades.append(json.loads(linea))
        except Exception:
            pass

    output = {
        "vulnerabilidades": vulnerabilidades,
        "total": len(vulnerabilidades),
        "raw_output": resultado.stdout,
        "codigo_salida": resultado.returncode,
        "error": resultado.stderr if resultado.returncode != 0 else None
    }

    print(json.dumps(output))


if __name__ == "__main__":
    main()
