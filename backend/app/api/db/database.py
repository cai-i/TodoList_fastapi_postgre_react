# Import the SQLAlchemy parts¶
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import os 

POSTGRES_USER = os.environ.get("POSTGRES_USER")
POSTGRES_PASSWORD = os.environ.get("POSTGRES_PASSWORD")
POSTGRES_DB = os.environ.get("POSTGRES_DB")

# create a db URL
# définit le fichier dans lequel SQLite conservera les données.
SQLALCHEMY_DATABASE_URL = f"postgresql://userpd:postgrespassword@database/dbesiee"
print(SQLALCHEMY_DATABASE_URL)
# we are "connecting" to a SQLite database (opening a file with the SQLite database).
    # !! ici je crois que nous avons plutôt postgre ?
# The file will be located at the same directory in the file POSTGRES_DB ??

# create a SQLAlchemy "engine"
# nous instancions notre moteur, en transmettant l'URI de connexion à la base de données
engine = create_engine(
    SQLALCHEMY_DATABASE_URL
    # connect_args={"check_same_thread": False} 
        # needed only for SQLite
)

# Create a SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=True, bind=engine)
    # Each instance of the SessionLocal class will be a database session
    # the class itself is not a database session yet
    # But once we create an instance of the SessionLocal class, 
    # this instance will be the actual database session.

# Create a Base class
BaseSQL = declarative_base() # return a class
    # Later we will inherit from this class 
    # to create each of the database models or classes