from app.api.crud.crud_base import CRUDBase
from app.api.models.todos_model import Todo
from app.api.schemas.todo_basemodel import ToDoCreate, ToDoUpdate


class CRUDTodo(CRUDBase[Todo, ToDoCreate, ToDoUpdate]):
    ...

todo = CRUDTodo(Todo)