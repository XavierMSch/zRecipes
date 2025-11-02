from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from . import models

async def get_user_by_id(db: AsyncSession, id: int) -> models.User | None:
    # Busca un usuario por id
    result = await db.execute(select(models.User).filter(models.User.id == id))
    return result.scalar_one_or_none()