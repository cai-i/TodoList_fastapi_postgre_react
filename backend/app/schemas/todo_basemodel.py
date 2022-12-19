from pydantic import BaseModel, Field
from typing import Sequence, Optional, List
from datetime import date
from uuid import uuid4, UUID

class SubTodoBase(BaseModel):
    title: str
    progress : int

class SubTodoCreate(SubTodoBase):
    pass

class SubTodo(SubTodoBase):
    id: int
    todo_id: int

    class Config:
        orm_mode=True

class ToDoBase(BaseModel):
    title: str
    unit: str
    progress : int
    content : Optional[str]
    deadline : date

class ToDoCreate(ToDoBase):
    pass

class ToDoUpdate(ToDoBase):
    pass

class ToDoInDBBase(ToDoBase):
    id: int #Annotated[str, Field(default_factory=lambda: uuid4().hex)] #PrivateAttr
    subtodos : List[SubTodo] = []

    class Config:
        orm_mode= True

class ToDo(ToDoInDBBase):
    pass

class TodoSearchResults(BaseModel):
    results: Sequence[ToDo]