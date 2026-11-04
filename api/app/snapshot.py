"""Loads the frozen snapshot of teams and games from disk."""

import json
from dataclasses import dataclass
from datetime import date
from pathlib import Path

from pydantic import TypeAdapter

from app.models import Game, Team

DEFAULT_SNAPSHOT_DIR = Path(__file__).resolve().parent.parent / "data" / "snapshot"


@dataclass(frozen=True)
class Snapshot:
    source: str
    season: int
    taken_on: date
    teams: list[Team]
    games: list[Game]

    def find_team(self, team_id: int) -> Team | None:
        return next((team for team in self.teams if team.id == team_id), None)


def load_snapshot(directory: Path = DEFAULT_SNAPSHOT_DIR) -> Snapshot:
    def read(name: str):
        return json.loads((directory / name).read_text(encoding="utf-8"))

    meta = read("meta.json")
    return Snapshot(
        source=meta["source"],
        season=meta["season"],
        taken_on=date.fromisoformat(meta["taken_on"]),
        teams=TypeAdapter(list[Team]).validate_python(read("teams.json")),
        games=TypeAdapter(list[Game]).validate_python(read("games.json")),
    )
