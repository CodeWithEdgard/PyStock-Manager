from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALQUEMY_DATABASE_URL =   "sqlite:///./products.db"

engine = create_engine(
  SQLALQUEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()