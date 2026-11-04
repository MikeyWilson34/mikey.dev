# NBA API

A small Python API (FastAPI) that serves NBA teams and Team Records for the
2026 season. It never calls an outside service while answering a request: it
reads a Snapshot of [balldontlie](https://www.balldontlie.io) data saved in
`data/snapshot/`. See [ADR 0004](../docs/adr/0004-nba-api-own-copy-python.md).

## Endpoints

| Method and path | Returns |
| --- | --- |
| `GET /health` | `{"status": "ok"}` plus when the Snapshot was taken and how many games it holds |
| `GET /teams` | The 30 current NBA teams |
| `GET /teams/{team_id}` | One team; 404 if unknown, 422 if the id isn't a number |
| `GET /teams/{team_id}/record?season=2026` | Wins, losses, games played and win % from finished regular-season games. `season` defaults to the Snapshot's season |

Interactive docs are at http://127.0.0.1:8000/docs while the server runs.

## Set up

Needs Python 3.12 or newer. From this `api/` folder:

```
python -m venv .venv
.venv\Scripts\activate        # Windows (macOS/Linux: source .venv/bin/activate)
pip install -e ".[dev]"
```

## Run it

```
uvicorn app.main:app --reload
```

Then try http://127.0.0.1:8000/teams/8/record.

## Run the tests

```
pytest                 # everything
pytest tests/unit      # just the record maths
pytest -m invariant    # just the rules that must hold for any data
```

- `tests/unit` checks the record calculation with small hand-made games.
- `tests/api` calls each endpoint against the real Snapshot.
- `tests/invariants` checks rules like "league-wide wins equal losses". The
  future Nightly Check will run these against live data.

## Refresh the Snapshot

Get a free key from balldontlie, then:

```
# PowerShell
$env:BALLDONTLIE_API_KEY = "<your key>"
python scripts/fetch_snapshot.py --season 2026
```

The free tier allows 5 requests a minute, so the script waits about 13 seconds
between pages; a full season takes a few minutes. Never commit the key.

## Layout

```
app/
  main.py      routes (the HTTP layer)
  records.py   works out a Team Record from games (pure functions)
  snapshot.py  loads the Snapshot from disk
  models.py    data shapes
data/snapshot/ meta.json, teams.json, games.json
scripts/       fetch_snapshot.py
tests/         unit/, api/, invariants/
```
