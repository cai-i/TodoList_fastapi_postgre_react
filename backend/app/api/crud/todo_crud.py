from api.crud.crud_base import CRUDBase
from api.models.todos_model import Todo
from api.schemas.todo_basemodel import ToDoCreate, ToDoUpdate


class CRUDTodo(CRUDBase[Todo, ToDoCreate, ToDoUpdate]):
    ...

todo = CRUDTodo(Todo)