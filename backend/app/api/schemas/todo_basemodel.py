from pydantic import BaseModel, Field
from typing import Sequence
from datetime import datetime
from typing_extensions import Annotated

class ToDoBase(BaseModel):
    title: str
    unit: str

class ToDoCreate(ToDoBase):
    title: str
    unit: str

class ToDoUpdate(ToDoBase):
    pass

class ToDoInDBBase(ToDoBase):
    id: int

    class Config:
        orm_mode= True

class ToDo(ToDoInDBBase):
    pass

class ToDoInDB(ToDoInDBBase):
    pass

class TodoSearchResults(BaseModel):
    results: Sequence[ToDo]