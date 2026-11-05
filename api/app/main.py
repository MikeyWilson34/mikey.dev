"""The HTTP layer: routes that read from the snapshot and return JSON."""

from typing import Annotated

from fastapi import APIRouter, Depends, FastAPI, HTTPException, Request

from app.models import Health, SnapshotInfo, Team, TeamRecord
from app.records import team_record
from app.snapshot import Snapshot, load_snapshot

router = APIRouter()


def get_snapshot(request: Request) -> Snapshot:
    return request.app.state.snapshot


SnapshotDep = Annotated[Snapshot, Depends(get_snapshot)]


def get_team_or_404(team_id: int, snapshot: SnapshotDep) -> Team:
    team = snapshot.find_team(team_id)
    if team is None:
        raise HTTPException(status_code=404, detail=f"Team {team_id} not found")
    return team


TeamDep = Annotated[Team, Depends(get_team_or_404)]


@router.get("/health")
def health(snapshot: SnapshotDep) -> Health:
    return Health(
        status="ok",
        snapshot=SnapshotInfo(
            source=snapshot.source,
            season=snapshot.season,
            taken_on=snapshot.taken_on,
            game_count=len(snapshot.games),
        ),
    )


@router.get("/teams")
def list_teams(snapshot: SnapshotDep) -> list[Team]:
    return snapshot.teams


@router.get("/teams/{team_id}")
def get_team(team: TeamDep) -> Team:
    return team


@router.get("/teams/{team_id}/record")
def get_team_record(
    team: TeamDep, snapshot: SnapshotDep, season: int | None = None
) -> TeamRecord:
    if season is None:
        season = snapshot.season
    # The snapshot holds one season; anything else would be a misleading 0-0.
    if season != snapshot.season:
        raise HTTPException(status_code=404, detail=f"No data for season {season}")
    return team_record(team.id, season, snapshot.games)


def create_app(snapshot: Snapshot | None = None) -> FastAPI:
    """Build the app. Tests can pass their own snapshot; otherwise load the real one."""
    app = FastAPI(title="mikey.dev NBA API", version="0.1.0")
    app.state.snapshot = snapshot or load_snapshot()
    app.include_router(router)
    return app


app = create_app()
