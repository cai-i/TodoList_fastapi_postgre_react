# /backend/app/api/api.py

import os
from fastapi import FastAPI, Query, HTTPException, Request, Depends
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
    # allow to declare the type of the db parameters
    # have better type checks and completion in functions

from app.api.routers import todos
from app.api.db.database import engine, BaseSQL
from app.api.models import todos_model

from typing import Optional, Any

from pathlib import Path

from app.api.schemas.todo_basemodel import ToDo, TodoSearchResults, ToDoCreate, ToDoUpdate

from app.api import deps
from app.api.crud.todo_crud import todo

# specify our Jinja templates directory
BASE_PATH = Path(__file__).resolve().parent
TEMPLATES = Jinja2Templates(directory=str(BASE_PATH / "templates"))

todos_model.BaseSQL.metadata.create_all(bind=engine)

# initialise objet FastAPI
# qui fournit toutes les fonctionnalités de notre API
app = FastAPI(
    title="My Schedule",
    debug=True
)

# # Verson 2
origins = [
    'http://localhost:3000'
]

# configurer le partage de ressources cross-origin (CORS) 
# qui nous permettra essentiellement de configurer notre interface 
# React pour parler à ce backend. 
# Actuellement, cependant, nous n'autorisons que le trafic depuis 
# notre machine locale.
app.add_middleware(
    CORSMiddleware,
        # Pour effectuer des requêtes cross-origin, 
        # c'est-à-dire des requêtes provenant d'un protocole, 
        # d'une adresse IP, d'un nom de domaine ou d'un port différents
    allow_origins= origins,# ["*"],# version 2 : origins,
        # autorisera les requêtes cross-origin de notre domaine frontal 
        # et de notre port qui s'exécuteront à localhost
        #ds version 3, accepte les requêtes venant de toutes origines
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/", status_code=200, tags=["root"])
async def read_root(request: Request, db: Session = Depends(deps.get_db)) -> dict:
    todos = todo.get_multi(db=db, limit=10)
    return todos #{"status": "ok", "data" : todos}
    # return TEMPLATES.TemplateResponse(
    #     "index.html",
    #     {"request": request, "todos": todos},
    # )

# pour enregistrer le routeur
#app.include_router(todos.router)
    # inclura les terminaux

# dans tutoriel 2 : https://testdriven.io/blog/fastapi-react/
# todos = [
#     {
#         "id": 1,
#         "title": "App Full Stack Data",
#         "unit": "AFS"
#     },
#     {
#         "id": 2,
#         "title": "Get the job",
#         "unit": "Anglais"
#     },
#     {
#         "id": 3,
#         "title": "Entretiens",
#         "unit": "Life"
#     }
# ]

# @app.get("/todos", tags=["todos"])
# async def get_todos():
#     return { "data": todos }

@app.get("/todos/{todo_id}", status_code=200, response_model= ToDo)
def fetch_todo(
    *, 
    todo_id: int,
    db: Session = Depends(deps.get_db)
) -> Any:
    """
    Fetch a single todo by ID
    """
    result = todo.get(db= db, id=todo_id)
    if not result:
        # the exception is raised, not returned - 
        # you will get a validation error otherwise.
        raise HTTPException(
            status_code=404, detail=f"Todo with ID {todo_id} not found"
        )
    return result#{"status": "ok", "data" : result}

# query parameter
@app.get("/search/", status_code=200, response_model= TodoSearchResults)
def search_todos(
    *, 
    keyword: Optional[str] = Query(None, min_length=3, example="Entre"), 
    max_results: Optional[int] = 10,
    db: Session = Depends(deps.get_db)
) -> dict:
    """
    Search for recipes based on label keyword
    """
    todos= todo.get_multi(db=db, limit= max_results)
    if not keyword:
        return {"results": todos}
    results = filter(lambda todo: keyword.lower() in todo.title.lower(), todos)
    return {"results": list(results)[:max_results]} #{"status": "ok", "results": list(results)[:max_results]}

@app.post("/todos/", status_code=201, response_model= ToDo)
def create_todo(*, todo_in: ToDoCreate, db: Session = Depends(deps.get_db)) -> dict:
    """
    Create a new todo
    """
    todo_var = todo.create(db=db, obj_in=todo_in)
    return todo_var#{"status": "ok", "data" : todo_var}

@app.put("/todos/{id}", status_code=201, response_model= ToDo)
def update_todo(*, todo_in: ToDoUpdate, db: Session = Depends(deps.get_db), id=int) -> dict:
    """
    Update a todo
    """
    todo_var = todo.get(db=db, id=id)
    if not todo_var:
        raise HTTPException(status_code=404, detail="Todo not found")
    todo_var = todo.update(db=db, db_obj=todo_var, obj_in=todo_in)
    return todo_var #{"status": "ok", "data" : todo_var}

@app.delete("/todos/{id}", status_code=201, response_model= ToDo)
def delete_todo(*, db: Session = Depends(deps.get_db), id: int) -> dict:
    """
    Delete a todo
    """
    todo_var = todo.get(db=db, id=id)
    if not todo_var:
        raise HTTPException(status_code=404, detail="Item not found")
    todo_var = todo.delete(db=db, id=id)
    return todo_var#{"status": "ok", "data" : todo_var}

# @app.post("/todo_v2", tags=["todos"])
# async def add_todo(todo: dict) -> dict:
#     todos.append(todo)
#     return {
#         "data": { "Todo added." }
#     }

# @app.put("/todo_v2/{id}", tags=["todos"])
# async def update_todo(id: int, body: dict) -> dict:
#     for todo in todos:
#         if int(todo["id"]) == id:
#             todo["item"] = body["item"]
#             return {
#                 "data": f"Todo with id {id} has been updated."
#             }
#     return {
#         "data": f"Todo with id {id} not found."
#     }

# @app.delete("/todo/{id}", tags=["todos"])
# async def delete_todo(id: int) -> dict:
#     for todo in todos:
#         if int(todo["id"]) == id:
#             todos.remove(todo)
#             return {
#                 "data": f"Todo with id {id} has been removed."
#             }

#     return {
#         "data": f"Todo with id {id} not found."
#     }