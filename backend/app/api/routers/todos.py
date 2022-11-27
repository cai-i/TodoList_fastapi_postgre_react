# # backend/app/api/routers/todos.py

# import psycopg2

# from fastapi import APIRouter, UploadFile
# from typing import List

# router = APIRouter(
#     prefix='/todos_test'
#     # spécifie un chemin de base pour tous les opérateurs 
#     # de chemin suivants
# )
#     # fonctionnellement le même que l'objet FastAPI dans api.py
#     # mais peut être ajouté de manière modulaire à ce premier objet
#     # pouvons dc créer arbitrairement plusieurs de ces objets routeur
#     # et les regrouper tous dans api.py

# # liste de todos codée en dur
# # all_todos= [
# #     ToDoModel(id=1, title='App Schedule', unit='App Full Stack Data'),
# #     ToDoModel(id=2, title='Get the job', unit='Anglais')
# # ]

# @router.get('/', response_model=List[ToDoModel])
#     # déclarons le chemin relatif + type de retour
# async def get_todos():
#     """
#     Retrieve all todos
#     """
#     #connect to our database
#     conn = psycopg2.connect(
#         database="dbesiee", user="userpd", password="postgrespassword", host="0.0.0.0"
#     )
#     # create a cursor from that connection
#     cur = conn.cursor()
#     # get all our todos
#     cur.execute("SELECT * FROM todo ORDER BY id DESC")
#         # get most recent one at the top
#     # get all our rows from the cursor
#     rows= cur.fetchall()
#     # create return list
#     todos_list = []
#     # iterate through all our rows
#     for row in rows:
#         todos_list.append(
#             ToDoModel(
#                 id= row[0], title= row[1], unit= row[2]
#             )
#         )
#     # close our cursor
#     cur.close()
#     # close our connection
#     conn.close()
#     return todos_list
#     # return all_todos

# # @router.get('/titles/', response_model=List[str])
# # async def get_todos_titles():
# #     """
# #     Retrieve all todo titles
# #     """
# #     return [todo.title for todo in all_todos]

# @router.post('/')
#     # status 201 : like a new ressource has been created
# async def add_todo(file: UploadFile):
#     print("Create endpoint hit!!")
#     print(file.filename)
#     print(file.content_type)

#     #connect to our database
#     conn = psycopg2.connect(
#         database="dbesiee", user="userpd", password="postgrespassword", host="0.0.0.0"
#     )
#     # create a cursor from that connection
#     cur = conn.cursor()
#     # query
#     cur.execute(f"INSERT INTO todo (title, unit) VALUES ('{file.filename}', 'default for now' )")
#     conn.commit()
#     cur.close()
#     conn.close()