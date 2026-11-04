"""Fetch a fresh snapshot of NBA teams and games from balldontlie.

Writes three files to api/data/snapshot/:
  meta.json   when the snapshot was taken and for which season
  teams.json  the 30 current NBA teams
  games.json  every game of the season up to today

Usage (from the api/ folder, with the venv active):
  BALLDONTLIE_API_KEY=... python scripts/fetch_snapshot.py [--season 2026]

The free tier allows 5 requests a minute, so the script waits between pages.
This is the same code the nightly Data Refresh will reuse later.
"""

import argparse
import json
import os
import sys
import time
from datetime import UTC, date, datetime
from pathlib import Path

import httpx

BASE_URL = "https://api.balldontlie.io/nba/v1"
SNAPSHOT_DIR = Path(__file__).resolve().parent.parent / "data" / "snapshot"
SECONDS_BETWEEN_REQUESTS = 13  # 5 requests/minute, with a little slack
CURRENT_CONFERENCES = {"East", "West"}  # historical teams have neither


def get(client: httpx.Client, path: str, params: dict | None = None) -> dict:
    response = client.get(path, params=params)
    response.raise_for_status()
    return response.json()


def fetch_teams(client: httpx.Client) -> list[dict]:
    teams = [
        {
            "id": team["id"],
            "abbreviation": team["abbreviation"],
            "city": team["city"],
            "name": team["name"],
            "full_name": team["full_name"],
            "conference": team["conference"],
            "division": team["division"],
        }
        for team in get(client, "/teams")["data"]
        if team["conference"] in CURRENT_CONFERENCES
    ]
    if len(teams) != 30:
        sys.exit(f"Expected 30 current teams, got {len(teams)}. Check the filter.")
    return sorted(teams, key=lambda team: team["id"])


def fetch_games(client: httpx.Client, season: int, up_to: date) -> list[dict]:
    games: list[dict] = []
    params = {"seasons[]": season, "end_date": up_to.isoformat(), "per_page": 100}
    while True:
        time.sleep(SECONDS_BETWEEN_REQUESTS)
        page = get(client, "/games", params)
        games.extend(
            {
                "id": game["id"],
                "date": game["date"][:10],
                "season": game["season"],
                "status": game["status"],
                "postseason": game["postseason"],
                "home_team_id": game["home_team"]["id"],
                "home_team_score": game["home_team_score"],
                "visitor_team_id": game["visitor_team"]["id"],
                "visitor_team_score": game["visitor_team_score"],
            }
            for game in page["data"]
        )
        print(f"  fetched {len(games)} games")
        cursor = page.get("meta", {}).get("next_cursor")
        if cursor is None:
            break
        params["cursor"] = cursor
    return sorted(games, key=lambda game: (game["date"], game["id"]))


def write_json(name: str, data: object) -> None:
    path = SNAPSHOT_DIR / name
    path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {path}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--season", type=int, default=2026)
    args = parser.parse_args()

    api_key = os.environ.get("BALLDONTLIE_API_KEY")
    if not api_key:
        sys.exit("Set BALLDONTLIE_API_KEY first.")

    today = datetime.now(UTC).date()
    with httpx.Client(
        base_url=BASE_URL, headers={"Authorization": api_key}, timeout=30
    ) as client:
        print("Fetching teams")
        teams = fetch_teams(client)
        print(f"Fetching {args.season} games up to {today}")
        games = fetch_games(client, args.season, today)

    SNAPSHOT_DIR.mkdir(parents=True, exist_ok=True)
    write_json("meta.json", {
        "source": "balldontlie",
        "season": args.season,
        "taken_on": today.isoformat(),
    })
    write_json("teams.json", teams)
    write_json("games.json", games)


if __name__ == "__main__":
    main()
