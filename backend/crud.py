from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from . import models, schemas, security

# --- CRUD de User ---

async def get_user_by_id(db: AsyncSession, id: int) -> models.User | None:
    """
    Busca un usuario por id.
    """
    query = select(models.User).filter(models.User.id == id)
    result = await db.execute(query)
    return result.scalar_one_or_none()

async def get_user_by_email(db: AsyncSession, email: str) -> models.User | None:
    """
    Busca un usuario por email.
    """
    query = select(models.User).filter(models.User.email == email)
    result = await db.execute(query)
    return result.scalar_one_or_none()

async def get_user_by_username(db: AsyncSession, username: str) -> models.User | None:
    """
    Busca un usuario por username.
    """
    query = select(models.User).filter(models.User.username == username)
    result = await db.execute(query)
    return result.scalar_one_or_none()

async def get_user_by_rut(db: AsyncSession, rut: str) -> models.User | None:
    """
    Busca un usuario por rut.
    """
    query = select(models.User).filter(models.User.rut == rut)
    result = await db.execute(query)
    return result.scalar_one_or_none()

async def create_user(db: AsyncSession, user: schemas.UserCreate) -> models.User:
    """
    Crea un usuario nuevo.
    """
    hashed_password = security.get_password_hash(user.password)
    db_user = models.User(
        username=user.username,
        rut=user.rut,
        email=user.email,
        region=user.region,
        comuna=user.comuna,
        hashed_password=hashed_password
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user, attribute_names=["recipes", "recipe_lists"])
    return db_user

# --- CRUD de Recipe ---

async def create_user_recipe(db: AsyncSession, recipe: schemas.RecipeCreate, user_id: int) -> models.Recipe:
    """
    Crea una receta de un usuario.
    """
    db_recipe = models.Recipe(
        **recipe.model_dump(),
        owner_id=user_id
    )
    db.add(db_recipe)
    await db.commit()
    await db.refresh(db_recipe)
    return db_recipe

async def get_recipes(db: AsyncSession, skip: int, limit: int) -> list[models.Recipe]:
    """
    Retorna una lista de recetas.
    """
    query = select(models.Recipe).offset(skip).limit(limit)
    result = await db.execute(query)
    return list(result.scalars().all())

async def get_recipe(db: AsyncSession, recipe_id: int) -> models.Recipe | None:
    """
    Retorna una receta por su id o None si no la encuentra.
    """
    query = select(models.Recipe).options(selectinload(models.Recipe.owner)).filter(models.Recipe.id == recipe_id)
    result = await db.execute(query)
    return result.scalar_one_or_none()