# /backend/app/api/api.py

import os
from fastapi import FastAPI, Query, HTTPException, Request, Depends
# from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
from typing import Optional, Any
from pathlib import Path

from api import deps
from api.db.database import engine, BaseSQL
from api.models import todos_model
from api.schemas.todo_basemodel import ToDo, TodoSearchResults, ToDoCreate, ToDoUpdate
from api.crud.todo_crud import todo

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

@app.get("/", status_code=200, tags=["root"])
async def read_root(request: Request, db: Session = Depends(deps.get_db)) -> dict:
    todos = todo.get_multi(db=db, limit=10)
    return todos

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
        raise HTTPException(
            status_code=404, detail=f"Todo with ID {todo_id} not found"
        )
    return result

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
    return {"results": list(results)[:max_results]}

@app.post("/todos/", status_code=201, response_model= ToDo)
def create_todo(*, todo_in: ToDoCreate, db: Session = Depends(deps.get_db)) -> dict:
    """
    Create a new todo
    """
    todo_var = todo.create(db=db, obj_in=todo_in)
    return todo_var

@app.put("/todos/{id}", status_code=201, response_model= ToDo)
def update_todo(*, todo_in: ToDoUpdate, db: Session = Depends(deps.get_db), id=int) -> dict:
    """
    Update a todo
    """
    todo_var = todo.get(db=db, id=id)
    if not todo_var:
        raise HTTPException(status_code=404, detail="Todo not found")
    todo_var = todo.update(db=db, db_obj=todo_var, obj_in=todo_in)
    return todo_var

@app.delete("/todos/{id}", status_code=201, response_model= ToDo)
def delete_todo(*, db: Session = Depends(deps.get_db), id: int) -> dict:
    """
    Delete a todo
    """
    todo_var = todo.get(db=db, id=id)
    if not todo_var:
        raise HTTPException(status_code=404, detail="Item not found")
    todo_var = todo.delete(db=db, id=id)
    return todo_var
