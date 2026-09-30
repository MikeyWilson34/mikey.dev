# The NBA API serves its own copy of current-season data, written in Python

The API never calls a public NBA source while answering a request. A nightly Data Refresh copies current-season data from a public source into the API's own database, and the API serves only from that copy, so an outage or rate limit at the source can't break the API. Pipeline Runs test against a frozen snapshot so results are repeatable. The Nightly Check tests live data against rules that always hold (e.g. no negative points) instead of exact values. The API is written in Python (FastAPI, pytest, PostgreSQL) even though the site is TypeScript, to show range across two stacks.

The Data Refresh source is balldontlie's free tier. We rejected `nba_api`: on 2026-09-29, stats.nba.com timed out and cdn.nba.com returned 403 even from a home connection. Outages at the source are covered by tests that simulate them, not by depending on a source that really fails.
