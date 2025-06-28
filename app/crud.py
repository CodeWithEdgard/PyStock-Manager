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

def update_product(db: Session, product_id: int, product_data: schemas.ProductCreate):
  db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
  
  if db_product:
    db_product.name = product_data.name
    db_product.description = product_data.description
    db_product.price = product_data.price
    db_product.quantity_in_stock = product_data.quantity_in_stock
    
  db.commit()
  db.refresh(db_product)
  
  return db_product

def delete_product(db: Session, product_id: int):
  db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
  
  if db_product:
    db.delete(db_product)
    db.commit()
  return db_product