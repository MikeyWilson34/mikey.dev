RECORD_FIELDS = {"team_id", "season", "wins", "losses", "games_played", "win_pct"}


def test_record_defaults_to_the_snapshot_season(client, snapshot):
    response = client.get("/teams/8/record")

    assert response.status_code == 200
    record = response.json()
    assert set(record) == RECORD_FIELDS
    assert record["team_id"] == 8
    assert record["season"] == snapshot.season


def test_explicit_season_matches_the_default(client, snapshot):
    explicit = client.get("/teams/8/record", params={"season": snapshot.season})

    assert explicit.status_code == 200
    assert explicit.json() == client.get("/teams/8/record").json()


def test_season_not_in_the_snapshot_is_404(client):
    response = client.get("/teams/8/record", params={"season": 1999})

    assert response.status_code == 404
    assert response.json() == {"detail": "No data for season 1999"}


def test_record_for_unknown_team_is_404(client):
    response = client.get("/teams/999/record")

    assert response.status_code == 404
    assert response.json() == {"detail": "Team 999 not found"}


def test_non_integer_team_id_or_season_is_422(client):
    assert client.get("/teams/nuggets/record").status_code == 422
    assert client.get("/teams/8/record", params={"season": "latest"}).status_code == 422
