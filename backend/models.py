from sqlalchemy import ForeignKey, Integer, Identity, String, Boolean, Table, Column, DateTime, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from database import Base

user_likes_association = Table(
    "user_likes_association",
    Base.metadata,
    Column("user_id", ForeignKey("users.id"), primary_key=True),
    Column("recipe_id", ForeignKey("recipes.id"), primary_key=True),
)

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Identity(always=True), primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(30), unique=True, nullable=False)
    rut: Mapped[str] = mapped_column(String(12), unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    region: Mapped[str] = mapped_column(String(60), nullable=False)
    comuna: Mapped[str] = mapped_column(String(100), nullable=False)
    is_admin: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)    

    recipes: Mapped[list["Recipe"]] = relationship(back_populates="owner")

    recipe_lists: Mapped[list["RecipeList"]] = relationship(back_populates="owner")

    liked_recipes: Mapped[list["Recipe"]] = relationship(
        secondary=user_likes_association,
        back_populates="liked_by_users",
    )

    reports: Mapped[list["Report"]] = relationship(back_populates="reporter")

recipe_list_association = Table(
    "recipe_list_association",
    Base.metadata,
    Column("recipe_id", ForeignKey("recipes.id"), primary_key=True),
    Column("recipe_list_id", ForeignKey("recipe_lists.id"), primary_key=True),
)

class Report(Base):
    __tablename__ = "reports"
    id: Mapped[int] = mapped_column(Identity(always=True), primary_key=True, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, server_default=func.now())

    reporter_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    reporter: Mapped["User"] = relationship(back_populates="reports")

    recipe_id: Mapped[int] = mapped_column(ForeignKey("recipes.id"))
    recipe: Mapped["Recipe"] = relationship(back_populates="reports")

class Recipe(Base):
    __tablename__ = "recipes"
    id: Mapped[int] = mapped_column(Identity(always=True), primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    description: Mapped[str] = mapped_column(String(1024), nullable=True)
    image_url: Mapped[str] = mapped_column(String(1024), nullable=True)
    ingredients: Mapped[list[dict[str, str]]] = mapped_column(JSONB, nullable=False, server_default='[]')
    steps: Mapped[list[dict[str, str]]] = mapped_column(JSONB, nullable=False, server_default='[]')
    
    owner_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    owner: Mapped["User"] = relationship(back_populates="recipes")

    recipe_lists: Mapped[list["RecipeList"]] = relationship(
        secondary=recipe_list_association,
        back_populates="recipes",
    )

    liked_by_users: Mapped[list["User"]] = relationship(
        secondary=user_likes_association,
        back_populates="liked_recipes",
    )
    
    reports: Mapped[list["Report"]] = relationship(back_populates="recipe")

class RecipeList(Base):
    __tablename__ = "recipe_lists"
    id: Mapped[int] = mapped_column(Identity(always=True), primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    owner_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

    owner: Mapped["User"] = relationship(back_populates="recipe_lists")
    recipes: Mapped[list["Recipe"]] = relationship(
        secondary=recipe_list_association,
        back_populates="recipe_lists",
    )