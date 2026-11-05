import pytest
from fastapi.testclient import TestClient

from app.main import create_app
from app.snapshot import Snapshot, load_snapshot


@pytest.fixture(scope="session")
def snapshot() -> Snapshot:
    """The real frozen snapshot in data/snapshot/."""
    return load_snapshot()


@pytest.fixture(scope="session")
def client(snapshot: Snapshot) -> TestClient:
    return TestClient(create_app(snapshot))
