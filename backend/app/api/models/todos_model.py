from sqlalchemy import Column, String, Integer, DateTime
# from sqlalchemy.dialects.postgresql import UUID

from app.api.db.database import BaseSQL

class Todo(BaseSQL):
    # create class that inherit from BaseSQL

    __tablename__ = "todo"

    # Create model attributes/columns
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    unit = Column(String)
    #deadline = Column(DateTime())