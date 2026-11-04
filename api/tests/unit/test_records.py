"""Unit tests for team_record, using small hand-made games."""

from datetime import date

import pytest

from app.models import Game
from app.records import team_record

NUGGETS, LAKERS, CELTICS = 8, 14, 2
SEASON = 2026


def game(home: int, home_score: int, visitor: int, visitor_score: int, **overrides) -> Game:
    """A Final regular-season game unless overridden."""
    fields = {
        "id": 1,
        "date": date(2026, 11, 1),
        "season": SEASON,
        "status": "Final",
        "postseason": False,
        "home_team_id": home,
        "home_team_score": home_score,
        "visitor_team_id": visitor,
        "visitor_team_score": visitor_score,
    }
    return Game(**(fields | overrides))


@pytest.mark.parametrize(
    "played, expected_wins, expected_losses",
    [
        pytest.param(game(NUGGETS, 110, LAKERS, 100), 1, 0, id="home win"),
        pytest.param(game(NUGGETS, 100, LAKERS, 110), 0, 1, id="home loss"),
        pytest.param(game(LAKERS, 100, NUGGETS, 110), 1, 0, id="away win"),
        pytest.param(game(LAKERS, 110, NUGGETS, 100), 0, 1, id="away loss"),
    ],
)
def test_counts_wins_and_losses_from_both_sides(played, expected_wins, expected_losses):
    record = team_record(NUGGETS, SEASON, [played])

    assert (record.wins, record.losses, record.games_played) == (
        expected_wins,
        expected_losses,
        1,
    )


def test_ignores_games_the_team_did_not_play():
    record = team_record(NUGGETS, SEASON, [game(LAKERS, 110, CELTICS, 100)])

    assert record.games_played == 0


@pytest.mark.parametrize("status", ["2026-11-05T00:30:00Z", "3rd Qtr", "Halftime"])
def test_ignores_games_that_are_not_final(status):
    record = team_record(NUGGETS, SEASON, [game(NUGGETS, 110, LAKERS, 100, status=status)])

    assert record.games_played == 0


def test_ignores_postseason_games():
    record = team_record(NUGGETS, SEASON, [game(NUGGETS, 110, LAKERS, 100, postseason=True)])

    assert record.games_played == 0


def test_ignores_games_from_other_seasons():
    record = team_record(NUGGETS, SEASON, [game(NUGGETS, 110, LAKERS, 100, season=2025)])

    assert record.games_played == 0


def test_team_with_no_games_has_an_empty_record():
    record = team_record(NUGGETS, SEASON, [])

    assert record.model_dump() == {
        "team_id": NUGGETS,
        "season": SEASON,
        "wins": 0,
        "losses": 0,
        "games_played": 0,
        "win_pct": 0.0,
    }


@pytest.mark.parametrize(
    "wins, losses, expected_pct",
    [(2, 1, 0.667), (1, 2, 0.333), (1, 7, 0.125), (3, 0, 1.0)],
)
def test_win_pct_is_rounded_to_three_decimals(wins, losses, expected_pct):
    games = [game(NUGGETS, 110, LAKERS, 100)] * wins + [game(NUGGETS, 100, LAKERS, 110)] * losses

    assert team_record(NUGGETS, SEASON, games).win_pct == expected_pct
