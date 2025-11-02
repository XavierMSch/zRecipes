from .database import engine, Base
from . import models
import asyncio

async def init_models():
    async with engine.begin() as conn:
        # print("Borrando tablas...")
        # await conn.run_sync(Base.metadata.drop_all)

        print("Creando tablas si no existen...")
        await conn.run_sync(Base.metadata.create_all)

    print("Tablas creadas correctamente")

if __name__ == "__main__":
    print("Iniciando creación y/o eliminación de tablas")
    asyncio.run(init_models())
    print("Creación/eliminación de tablas terminado")