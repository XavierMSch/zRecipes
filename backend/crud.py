from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from . import models, schemas, security

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
    await db.refresh(db_user)
    return db_user