"""Rules that must hold for any data, not just this snapshot.

These go through the HTTP API so the future Nightly Check can run the same
tests against live data. Run them on their own with: pytest -m invariant
"""

import pytest

from app.records import counts_toward_record

pytestmark = pytest.mark.invariant


@pytest.fixture(scope="module")
def records(client) -> list[dict]:
    team_ids = [team["id"] for team in client.get("/teams").json()]
    return [client.get(f"/teams/{team_id}/record").json() for team_id in team_ids]


def test_wins_plus_losses_equals_games_played(records):
    broken = [r for r in records if r["wins"] + r["losses"] != r["games_played"]]

    assert broken == []


def test_win_pct_is_between_0_and_1(records):
    broken = [r for r in records if not 0 <= r["win_pct"] <= 1]

    assert broken == []


def test_league_wins_equal_league_losses_equal_games(records, snapshot):
    counted_games = sum(counts_toward_record(g, snapshot.season) for g in snapshot.games)

    assert sum(r["wins"] for r in records) == counted_games
    assert sum(r["losses"] for r in records) == counted_games


def test_every_game_is_between_two_known_teams(client, snapshot):
    team_ids = {team["id"] for team in client.get("/teams").json()}
    strangers = [
        g.id
        for g in snapshot.games
        if g.home_team_id not in team_ids or g.visitor_team_id not in team_ids
    ]

    assert strangers == []
