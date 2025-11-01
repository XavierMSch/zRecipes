import re
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from typing import AsyncGenerator

DATABASE_URL = 'postgresql://neondb_owner:npg_iOz3GWxpyTL6@ep-cold-tree-acyfan2v-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

engine = create_async_engine(re.sub(r'^postgresql:', 'postgresql+asyncpg:', DATABASE_URL), echo=True)

SessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    autocommit=False,
    autoflush=False,
)

class Base(DeclarativeBase):
    pass

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with SessionLocal() as session:
        yield session