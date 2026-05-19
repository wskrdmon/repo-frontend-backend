import sys
import json
import subprocess


def main():
    params = json.loads(sys.argv[1])

    objetivo = params["objetivo"]
    puertos = params.get("puertos", "")
    tipo_escaneo = params.get("tipo_escaneo", "-sV")
    velocidad = params.get("velocidad", 3)

    cmd = ["nmap", "-oX", "-", tipo_escaneo, f"-T{velocidad}"]
    if puertos:
        cmd.extend(["-p", puertos])
    cmd.append(objetivo)

    resultado = subprocess.run(cmd, capture_output=True, text=True, timeout=300)

    output = {
        "raw_output": resultado.stdout,
        "codigo_salida": resultado.returncode,
        "error": resultado.stderr if resultado.returncode != 0 else None
    }

    print(json.dumps(output))


if __name__ == "__main__":
    main()
