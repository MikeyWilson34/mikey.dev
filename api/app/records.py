"""Team Records, worked out from game results.

Pure functions only: no I/O and no HTTP, so they can be unit-tested directly.
"""

from collections.abc import Iterable

from app.models import Game, TeamRecord


def counts_toward_record(game: Game, season: int) -> bool:
    """A game counts if it is a finished regular-season game of that season."""
    return game.season == season and game.status == "Final" and not game.postseason


def team_record(team_id: int, season: int, games: Iterable[Game]) -> TeamRecord:
    wins = losses = 0
    for game in games:
        if not counts_toward_record(game, season):
            continue
        if game.home_team_id == team_id:
            team_score, opponent_score = game.home_team_score, game.visitor_team_score
        elif game.visitor_team_id == team_id:
            team_score, opponent_score = game.visitor_team_score, game.home_team_score
        else:
            continue
        if team_score > opponent_score:
            wins += 1
        else:
            losses += 1

    games_played = wins + losses
    win_pct = round(wins / games_played, 3) if games_played else 0.0
    return TeamRecord(
        team_id=team_id,
        season=season,
        wins=wins,
        losses=losses,
        games_played=games_played,
        win_pct=win_pct,
    )
