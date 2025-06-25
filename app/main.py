from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import crud, models, schemas
from . import models
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

@app.post("/products/", response_model=schemas.Product)
def create_new_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
  return crud.create_product(db=db, product=product)