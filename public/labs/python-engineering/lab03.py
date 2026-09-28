"""Lab 03: expose the pipeline as a command-line tool."""

import argparse
import json
import sys
from pathlib import Path

from lab02 import load_sessions, summarize


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Summarize a study-session CSV.")
    parser.add_argument("input", type=Path, help="UTF-8 CSV: date,project,minutes")
    parser.add_argument("--output", type=Path, help="Write JSON to a file")
    args = parser.parse_args(argv)

    try:
        if args.output and args.output.resolve() == args.input.resolve():
            raise ValueError("output must not overwrite the input")
        report = summarize(load_sessions(args.input))
        content = json.dumps(report, ensure_ascii=False, indent=2) + "\n"
        if args.output:
            args.output.write_text(content, encoding="utf-8")
        else:
            print(content, end="")
    except (OSError, ValueError) as error:
        print(f"error: {error}", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
