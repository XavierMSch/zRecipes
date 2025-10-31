from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, autoincrement=True, primary_key=True, index=True)
    rut = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    region = Column(String, nullable=False)
    comuna = Column(String, nullable=False)

    recipes = relationship("Recipe", back_populates="owner")
    lists = relationship("RecipeList", back_populates="owner")
