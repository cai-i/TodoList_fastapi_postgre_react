from sqlalchemy import Column, String, Integer, DateTime

from app.api.db.database import BaseSQL

class Todo(BaseSQL):

    __tablename__ = "todo"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    unit = Column(String)