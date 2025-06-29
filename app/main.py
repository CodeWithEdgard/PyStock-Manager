from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import crud, models, schemas
from . import models
from .database import SessionLocal, engine
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    # Lista de endereços que podem acessar nossa API.
    # Por enquanto, só os de desenvolvimento local.
    "http://localhost",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Permite todos os métodos: GET, POST, PUT, DELETE
    allow_headers=["*"], # Permite todos os cabeçalhos
)

app.mount("/static", StaticFiles(directory="static"), name="static")
@app.get("/", response_class=FileResponse)
async def read_index():
  return "static/index.html"

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

@app.post("/products/", response_model=schemas.Product)
def create_new_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
  return crud.create_product(db=db, product=product)

@app.get("/products/", response_model=list[schemas.Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
  products = crud.get_products(db, skip=skip, limit=limit)
  return products

@app.get("/products/{product_id}", response_model=schemas.Product)
def read_product_by_id(product_id: int, db: Session = Depends(get_db)):
  db_product = crud.get_product_by_id(db=db, product_id= product_id)
  
  if db_product is None:
    raise HTTPException(status_code=404, detail="Product not found")
  return db_product

@app.put("/products/{product_id}", response_model=schemas.Product)
def update_existing_product(product_id: int, product: schemas.ProductCreate, db: Session = Depends(get_db)):
  update_product = crud.update_product(db=db, product_id=product_id, product_data=product)
  
  if update_product is None:
    raise HTTPException(status_code=404, detail="Product not found")
  return update_product

@app.delete("/products/{product_id}", response_model=schemas.Product)
def delete_existing_product(product_id: int, db: Session = Depends(get_db)):
  deleted_product = crud.delete_product(db=db, product_id=product_id)
  
  if deleted_product is None:
    raise HTTPException(status_code=404, detail="Product not found")
  return deleted_product