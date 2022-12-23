from sqlalchemy.orm import Session
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder
from typing import List, Union, Dict, Any

from models.todos_model import Todo, SubTodo
from schemas.todo_basemodel import ToDoCreate, ToDoUpdate, SubTodoCreate, SubTodoUpdate

def get_todo_by_id(db: Session, todo_id: int) -> Todo:
    record = db.query(Todo).filter(Todo.id == todo_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Todo with id {todo_id} not found") 
    return record

def get_todos(
        db: Session, 
        *, 
        skip: int = 0, 
        limit: int = 100
    ) -> List[Todo]:
    return db.query(Todo).offset(skip).limit(limit).all()


def create_todo(db: Session, *, obj_in: ToDoCreate) -> Todo:
    obj_in_data = jsonable_encoder(obj_in)
        # jsonable_encoder : 
            # pr convertir un type de données (comme un modèle Pydantic) 
            # en quelque chose de compatible avec JSON (comme un dict, list, etc.)
            # ici, c'est un Pydantic (aller regarder ds repo schema)
    db_obj = Todo(**obj_in_data)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def update_todo(db: Session, *, db_obj: Todo, obj_in: Union[ToDoUpdate, Dict[str, Any]]) -> Todo:
    obj_data = jsonable_encoder(db_obj)
    if isinstance(obj_in, dict):
        update_data = obj_in
    else:
        update_data = obj_in.dict(exclude_unset=True)
    for field in obj_data:
        if field in update_data:
            setattr(db_obj, field, update_data[field])
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def delete_todo(db: Session, *, todo_id: int) -> Todo:
    obj = get_todo_by_id(db=db, todo_id=todo_id)
    db.delete(obj)
    db.commit()
    return obj

# def delete_all_todos(db: Session) -> List[Todo]:
#     records = db.query(Todo).filter()
#     print(records)
#     for record in records:
#         db.delete(record)
#     db.commit()
#     return records

def get_subtodos(db: Session, todo_id: int, skip: int = 0, limit: int = 100):
    records = db.query(SubTodo).filter(SubTodo.todo_id == todo_id).offset(skip).limit(limit).all()
    if not records:
        raise HTTPException(status_code=404, detail="SubTodo of Todo with id {todo_id} not found") 
    return records

def get_subtodo_by_id(db: Session, subtodo_id: int, todo_id: int) -> Todo:
    record = db.query(SubTodo).filter(SubTodo.todo_id == todo_id).filter(SubTodo.id == subtodo_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Todo with id {todo_id} not found") 
    return record

def create_todo_subtodo(db: Session, subtodo: SubTodoCreate, todo_id: int):
    obj_in_data = jsonable_encoder(subtodo)
    obj = SubTodo(**obj_in_data, todo_id=todo_id)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def update_subtodo(db: Session, *, db_obj: SubTodo, obj_in: Union[SubTodoUpdate, Dict[str, Any]]) -> SubTodo:
    obj_data = jsonable_encoder(db_obj)
    if isinstance(obj_in, dict):
        update_data = obj_in
    else:
        update_data = obj_in.dict(exclude_unset=True)
    for field in obj_data:
        if field in update_data:
            setattr(db_obj, field, update_data[field])
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def delete_subtodo(db: Session, subtodo_id: int, todo_id: int) -> Todo:
    obj = get_subtodo_by_id(db=db, subtodo_id=subtodo_id, todo_id=todo_id)
    db.delete(obj)
    db.commit()
    return obj