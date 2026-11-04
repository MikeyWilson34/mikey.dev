# The NBA API serves its own copy of current-season data, written in Python

The API never calls a public NBA source while answering a request. A nightly Data Refresh copies current-season data from a public source into the API's own database, and the API serves only from that copy, so an outage or rate limit at the source can't break the API. Pipeline Runs test against a frozen snapshot so results are repeatable. The Nightly Check tests live data against rules that always hold (e.g. no negative points) instead of exact values. The API is written in Python (FastAPI, pytest, PostgreSQL) even though the site is TypeScript, to show range across two stacks.

The Data Refresh source is balldontlie's free tier. We rejected `nba_api`: on 2026-09-29, stats.nba.com timed out and cdn.nba.com returned 403 even from a home connection. Outages at the source are covered by tests that simulate them, not by depending on a source that really fails.

## Amendment, 2026-11-04: build on teams and games from the free tier

balldontlie's free tier (5 requests a minute) turned out to cover less than we assumed. `/nba/v1/teams`, `/nba/v1/players` and `/nba/v1/games` work, including the 2026 season with final scores. `/nba/v1/stats` and `/nba/v1/season_averages` return 401 and need a paid plan.

We stay on the free tier and build on teams, players and games. The API works out each Team Record (and later, standings) from game results itself instead of fetching them, counting only finished regular-season games. Player stats can come later by upgrading the plan; nothing else in this decision changes.

The first slice serves a Snapshot committed as JSON files and has no database yet. PostgreSQL arrives with the Data Refresh, which will reuse the script that fetches the Snapshot.
