"""Lab 01: validate one study session."""

from dataclasses import dataclass
from datetime import date


@dataclass(frozen=True)
class Session:
    day: date
    project: str
    minutes: int


def parse_row(row: dict[str, str]) -> Session:
    required = ("date", "project", "minutes")
    if any(not isinstance(row.get(key), str) for key in required):
        raise ValueError("required fields: date, project, minutes")

    day_text = row["date"].strip()
    try:
        day = date.fromisoformat(day_text)
    except ValueError:
        raise ValueError("date must be a valid YYYY-MM-DD date") from None
    if day.isoformat() != day_text:
        raise ValueError("date must use YYYY-MM-DD")

    project = row["project"].strip()
    if not project:
        raise ValueError("project must not be empty")

    minutes_text = row["minutes"].strip()
    if not minutes_text.isascii() or not minutes_text.isdecimal():
        raise ValueError("minutes must be a positive integer")
    minutes = int(minutes_text)
    if minutes <= 0:
        raise ValueError("minutes must be a positive integer")
    return Session(day, project, minutes)


if __name__ == "__main__":
    session = parse_row(
        {"date": "2026-09-28", "project": "python", "minutes": "45"}
    )
    print(f"{session.day} | {session.project} | {session.minutes} min")
