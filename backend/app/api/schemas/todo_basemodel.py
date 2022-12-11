from pydantic import BaseModel, Field
from typing import Sequence, Optional
from datetime import date
from typing_extensions import Annotated
import pytz

class ToDoBase(BaseModel):
    title: str
    unit: str
    progress : int
    content : Optional[str]
    deadline : date

class ToDoCreate(ToDoBase):
    title: str
    unit: str
    progress : int
    content : Optional[str]
    deadline : date

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