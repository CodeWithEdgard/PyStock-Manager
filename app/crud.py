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