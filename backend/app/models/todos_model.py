from sqlalchemy import Column, String, Integer, Date, ForeignKey, Identity
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db.database import BaseSQL

class Todo(BaseSQL):

    __tablename__ = "todo"

    id = Column(Integer, primary_key=True, index=True) #UUID(as_uuid=True)
    title = Column(String)
    unit = Column(String)
    progress = Column(Integer)
    content = Column(String)
    deadline = Column(Date)
    subtodos = relationship("SubTodo", back_populates='todo',cascade="all,delete")

class SubTodo(BaseSQL):

    __tablename__ = "subtodo"

    id = Column(Integer, Identity(start=1), primary_key=True, index=True)
    todo_id = Column(Integer, ForeignKey('todo.id', onupdate="CASCADE", ondelete="CASCADE"), primary_key=True)
    title = Column(String)
    progress = Column(Integer)
    todo = relationship("Todo", back_populates="subtodos")