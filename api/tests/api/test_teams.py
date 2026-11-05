TEAM_FIELDS = {"id", "abbreviation", "city", "name", "full_name", "conference", "division"}


def test_lists_exactly_the_30_current_teams(client):
    response = client.get("/teams")

    assert response.status_code == 200
    teams = response.json()
    assert len(teams) == 30
    assert len({team["id"] for team in teams}) == 30
    assert len({team["abbreviation"] for team in teams}) == 30


def test_every_team_has_the_expected_fields(client):
    teams = client.get("/teams").json()

    assert all(set(team) == TEAM_FIELDS for team in teams)
    assert {team["conference"] for team in teams} == {"East", "West"}


def test_gets_one_team_by_id(client):
    response = client.get("/teams/8")

    assert response.status_code == 200
    assert response.json() == {
        "id": 8,
        "abbreviation": "DEN",
        "city": "Denver",
        "name": "Nuggets",
        "full_name": "Denver Nuggets",
        "conference": "West",
        "division": "Northwest",
    }


def test_unknown_team_is_404_with_a_clear_message(client):
    response = client.get("/teams/999")

    assert response.status_code == 404
    assert response.json() == {"detail": "Team 999 not found"}


def test_non_integer_team_id_is_422(client):
    response = client.get("/teams/nuggets")

    assert response.status_code == 422
    assert response.json()["detail"][0]["loc"] == ["path", "team_id"]
