import sys
import json
import subprocess


def main():
    params = json.loads(sys.argv[1])

    url = params["url"]
    parametro = params.get("parametro", "")
    crawl = params.get("crawl", False)

    cmd = ["python", "/xsstrike/xsstrike.py", "-u", url]
    if parametro:
        cmd.extend(["--params", parametro])
    if crawl:
        cmd.append("--crawl")

    resultado = subprocess.run(cmd, capture_output=True, text=True, timeout=300)

    output = {
        "raw_output": resultado.stdout,
        "codigo_salida": resultado.returncode,
        "error": resultado.stderr if resultado.returncode != 0 else None
    }

    print(json.dumps(output))


if __name__ == "__main__":
    main()
