from typing import Generator

from app.api.db.database import SessionLocal  # 1


def get_db() -> Generator:
    db = SessionLocal()  # 2
    try:
        yield db  # 3
    finally:
        db.close()  # 4