from crud.crud_base import CRUDBase
from models.todos_model import Todo
from schemas.todo_basemodel import ToDoCreate, ToDoUpdate


class CRUDTodo(CRUDBase[Todo, ToDoCreate, ToDoUpdate]):
    ...

todo = CRUDTodo(Todo)