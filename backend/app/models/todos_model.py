from sqlalchemy import Column, String, Integer, Date, ForeignKey, Identity
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db.database import BaseSQL

class Todo(BaseSQL):

    __tablename__ = "todo"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    category = Column(String)
    progress = Column(Integer)
    done = Column(String)
    next_todo = Column(String)
    deadline = Column(Date)
    priority = Column(Integer)
    subtodos = relationship("SubTodo", back_populates='todo',cascade="all,delete")

class SubTodo(BaseSQL):

    __tablename__ = "subtodo"

    id = Column(Integer, Identity(start=1), primary_key=True, index=True)
    todo_id = Column(Integer, ForeignKey('todo.id', onupdate="CASCADE", ondelete="CASCADE"), primary_key=True)
    title = Column(String)
    progress = Column(Integer)
    done = Column(String)
    next_todo = Column(String)
    todo = relationship("Todo", back_populates="subtodos")