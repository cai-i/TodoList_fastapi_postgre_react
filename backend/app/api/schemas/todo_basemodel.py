from pydantic import BaseModel, Field
from typing import Sequence
from datetime import datetime
from typing_extensions import Annotated

# classe codée en dur qui sera ultérieurement remplacée 
# par des objets de base de données
class ToDoBase(BaseModel):
    # étend le BaseModel pydantic simplement pour le typage
    title: str
    unit: str
    #deadline: datetime

class ToDoCreate(ToDoBase):
    title: str
    unit: str
    #deadline : datetime

class ToDoUpdate(ToDoBase):
    pass

# Properties shared by models stored in DB
class ToDoInDBBase(ToDoBase):
    id: int

    class Config:
        orm_mode= True
        # dit au modèle Pydantic de lire les données 
        # même s'il ne s'agit pas d'un dict

# Properties to return to client
# ne veut pas forcément tout renvoyé au client
class ToDo(ToDoInDBBase):
    pass

# Properties properties stored in DB
class ToDoInDB(ToDoInDBBase):
    pass

class TodoSearchResults(BaseModel):
    results: Sequence[ToDo]