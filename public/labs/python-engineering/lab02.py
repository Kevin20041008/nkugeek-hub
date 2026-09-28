"""Lab 02: load CSV and build a deterministic summary."""

import csv
import json
from pathlib import Path

from lab01 import Session, parse_row


def load_sessions(path: Path) -> list[Session]:
    sessions = []
    with path.open(encoding="utf-8-sig", newline="") as source:
        reader = csv.DictReader(source, strict=True)
        if reader.fieldnames != ["date", "project", "minutes"]:
            raise ValueError("header must be: date,project,minutes")
        try:
            for row in reader:
                if None in row:
                    raise ValueError("unexpected extra columns")
                sessions.append(parse_row(row))
        except (ValueError, csv.Error) as error:
            raise ValueError(f"line {reader.line_num}: {error}") from None
    return sessions


def summarize(sessions: list[Session]) -> dict:
    totals: dict[str, int] = {}
    for session in sessions:
        totals[session.project] = totals.get(session.project, 0) + session.minutes
    return {
        "session_count": len(sessions),
        "total_minutes": sum(totals.values()),
        "projects": dict(sorted(totals.items())),
    }


if __name__ == "__main__":
    sample = Path(__file__).with_name("sessions.csv")
    print(json.dumps(summarize(load_sessions(sample)), indent=2))
