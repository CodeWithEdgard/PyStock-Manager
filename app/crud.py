from sqlalchemy.orm import Session
from . import models, schemas

def create_product(db: Session, product: schemas.ProductCreate):
  db_product = models.Product(
    name = product.name,
    description = product.description,
    price = product.price,
    quantity_in_stock = product.quantity_in_stock
  )
  
  db.add(db_product)
  db.commit()
  db.refresh(db_product)
  
  return db_product

def get_products(db: Session, skip: int = 0, limit: int = 100):
  return db.query(models.Product).offset(skip).limit(limit).all()

def get_product_by_id(db: Session, product_id: int):
  return db.query(models.Product).filter(models.Product.id == product_id).first()
