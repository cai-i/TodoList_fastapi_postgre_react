# /backend/app/api/api.py

import os
from fastapi import FastAPI, Query, HTTPException, Request, Depends
# from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
from typing import Optional, Any, List
from pathlib import Path

from db import deps
from db.database import engine, BaseSQL
from models import todos_model
from schemas.todo_basemodel import ToDo, TodoSearchResults, ToDoCreate, ToDoUpdate, SubTodo, SubTodoCreate, SubTodoUpdate
from crud.todo_crud import todo
from services import todos_services

# BASE_PATH = Path(__file__).resolve().parent
# TEMPLATES = Jinja2Templates(directory=str(BASE_PATH / "templates"))

todos_model.BaseSQL.metadata.create_all(bind=engine)

app = FastAPI(
    title="My Schedule",
    debug=True
)

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins= origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/", response_model= List[ToDo], tags=["todo"])
async def get_todos(db: Session = Depends(deps.get_db)) -> dict:
    return todos_services.get_todos(db=db)

@app.get("/todos/{todo_id}", response_model= ToDo, tags=["todo"])
def fetch_todo(
    *, 
    todo_id: int,
    db: Session = Depends(deps.get_db)
) -> Any:
    """
    Fetch a single todo by ID
    """
    return todos_services.get_todo_by_id(db= db, todo_id=todo_id)

@app.get("/search/", status_code=200, response_model= TodoSearchResults, tags=["todo"])
def search_todos(
    *, 
    keyword: Optional[str] = Query(None, min_length=3, example="Entre"), 
    max_results: Optional[int] = 10,
    db: Session = Depends(deps.get_db)
) -> dict:
    """
    Search for todos based on label keyword
    """
    todos= todo.get_multi(db=db, limit= max_results)
    if not keyword:
        return {"results": todos}
    results = filter(lambda todo: keyword.lower() in todo.title.lower(), todos)
    return {"results": list(results)[:max_results]}

@app.post("/todos/", status_code=201, response_model= ToDo, tags=["todo"])
def create_todo(*, todo_in: ToDoCreate, db: Session = Depends(deps.get_db)) -> dict:
    """
    Create a new todo
    """
    todo_var = todos_services.create_todo(db=db, obj_in=todo_in)
    return todo_var

@app.put("/todos/{id}", status_code=201, response_model= ToDo, tags=["todo"])
def update_todo(*, todo_in: ToDoUpdate, db: Session = Depends(deps.get_db), id : int) -> dict:
    """
    Update a todo
    """
    todo_var = todos_services.get_todo_by_id(db=db, todo_id=id)
    if not todo_var:
        raise HTTPException(status_code=404, detail="Todo not found")
    todo_var = todos_services.update_todo(db=db, db_obj=todo_var, obj_in=todo_in)
    return todo_var

@app.delete("/todos/{id}", status_code=201, response_model= ToDo, tags=["todo"])
def delete_todo(*, db: Session = Depends(deps.get_db), id: int) -> dict:
    """
    Delete a todo
    """
    todo_var = todos_services.get_todo_by_id(db=db, todo_id=id)
    if not todo_var:
        raise HTTPException(status_code=404, detail="Item not found")
    todo_var = todos_services.delete_todo(db=db, todo_id=id)
    return todo_var

# @app.delete("/todos", status_code=201, response_model= ToDo)
# def delete_todos(*, db: Session = Depends(deps.get_db)) -> dict:
#     """
#     Delete a todo
#     """
#     return todos_services.delete_all_todos(db=db)

@app.get("/todos/{todo_id}/subtodos", response_model=List[SubTodo], tags=["subtodo"])
def get_subtodos(todo_id: int, db: Session = Depends(deps.get_db)):
    return todos_services.get_subtodos(db=db, todo_id=todo_id)

@app.post("/todos/{todo_id}/subtodos", response_model=SubTodo, tags=["subtodo"])
def create_subtodos(*, todo_id: int, subtodo: SubTodoCreate, db: Session = Depends(deps.get_db)) -> dict:
    return todos_services.create_todo_subtodo(db=db, subtodo=subtodo, todo_id=todo_id)

@app.put("/todos/{id}/subtodos/{subtodo_id}", status_code=201, response_model= SubTodo, tags=["subtodo"])
def update_subtodo(*, subtodo_in: SubTodoUpdate, db: Session = Depends(deps.get_db), id: int, subtodo_id: int) -> dict:
    subtodo_var = todos_services.get_subtodo_by_id(db=db, subtodo_id=subtodo_id, todo_id=id)
    if not subtodo_var:
        raise HTTPException(status_code=404, detail="Subtodo not found")
    subtodo_var = todos_services.update_subtodo(db=db, db_obj=subtodo_var, obj_in=subtodo_in)
    return subtodo_var

@app.delete("/todos/{todo_id}/subtodos/{subtodo_id}", response_model= SubTodo, tags=["subtodo"])
def delete_subtodo(*, db: Session = Depends(deps.get_db), todo_id: int, subtodo_id: int) -> dict:
    subtodo_var = todos_services.get_subtodo_by_id(db=db, todo_id=todo_id, subtodo_id=subtodo_id)
    if not subtodo_var:
        raise HTTPException(status_code=404, detail="SubTodo not found")
    subtodo_var = todos_services.delete_subtodo(db=db, todo_id=todo_id, subtodo_id=subtodo_id)
    return subtodo_var