def test_health_reports_ok_and_describes_the_snapshot(client, snapshot):
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "snapshot": {
            "source": "balldontlie",
            "season": snapshot.season,
            "taken_on": snapshot.taken_on.isoformat(),
            "game_count": len(snapshot.games),
        },
    }
