"""The shapes of the data the API loads and returns."""

from datetime import date

from pydantic import BaseModel


class Team(BaseModel):
    id: int
    abbreviation: str
    city: str
    name: str
    full_name: str
    conference: str
    division: str


class Game(BaseModel):
    id: int
    date: date
    season: int
    status: str  # "Final" once finished; otherwise a start time or the period
    postseason: bool
    home_team_id: int
    home_team_score: int
    visitor_team_id: int
    visitor_team_score: int


class TeamRecord(BaseModel):
    team_id: int
    season: int
    wins: int
    losses: int
    games_played: int
    win_pct: float


class SnapshotInfo(BaseModel):
    source: str
    season: int
    taken_on: date
    game_count: int


class Health(BaseModel):
    status: str
    snapshot: SnapshotInfo
