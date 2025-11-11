from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload
from . import models, schemas, security

# --- CRUD de User ---

async def get_user_by_id(db: AsyncSession, id: int) -> models.User | None:
    """
    Busca un usuario por id.
    """
    query = select(models.User).filter(models.User.id == id)
    result = await db.execute(query)
    user = result.scalar_one_or_none()

    if user:
        await db.refresh(user, attribute_names=["recipes", "recipe_lists"])
    
    return user

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
    await db.refresh(db_user, attribute_names=["id", "username", "email", "region", "comuna", "is_admin", "rut"])
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
    await db.refresh(db_recipe, attribute_names=["owner", "liked_by_users"])
    return db_recipe

async def delete_recipe(db: AsyncSession, recipe_id: int) -> bool:
    """
    Elimina una receta por su id.
    Retorna True si la receta fue eliminada, False si no se encontró.
    """
    db_recipe = await get_recipe_by_id(db, recipe_id)
    if db_recipe:
        await db.delete(db_recipe)
        await db.commit()
        return True
    return False


async def get_recipes(db: AsyncSession, skip: int, limit: int) -> list[models.Recipe]:
    """
    Retorna una lista de recetas.
    """
    query = (
        select(models.Recipe)
        .options(selectinload(models.Recipe.owner), selectinload(models.Recipe.liked_by_users))
        .offset(skip)
        .limit(limit)
    )
    result = await db.execute(query)
    return list(result.scalars().all())

async def get_recipe_by_id(db: AsyncSession, recipe_id: int) -> models.Recipe | None:
    """
    Retorna una receta por su id o None si no la encuentra.
    """
    query = (
    select(models.Recipe)
    .options(selectinload(models.Recipe.owner), selectinload(models.Recipe.liked_by_users))
    .filter(models.Recipe.id == recipe_id)
    )
    result = await db.execute(query)
    return result.scalar_one_or_none()

async def search_recipes_by_name(db: AsyncSession, search_term: str, skip: int, limit: int) -> list[models.Recipe]:
    """
    Busca recetas por nombre a partir del término de búsqueda.
    """
    query = (
        select(models.Recipe)
        .options(selectinload(models.Recipe.owner), selectinload(models.Recipe.liked_by_users))
        .where(models.Recipe.name.ilike(f"%{search_term}%"))
        .offset(skip)
        .limit(limit)
    )
    result = await db.execute(query)
    return list(result.scalars().all())

async def get_recipes_by_owner(db: AsyncSession, owner_id: int, skip: int = 0, limit: int = 20) -> list[models.Recipe]:
    """
    Retorna todas las recetas de un usuario.
    """
    query = (
        select(models.Recipe)
        .options(selectinload(models.Recipe.owner), selectinload(models.Recipe.liked_by_users))
        .where(models.Recipe.owner_id == owner_id)
        .offset(skip)
        .limit(limit)
    )
    result = await db.execute(query)
    return list(result.scalars().all())

async def get_popular_recipes(db: AsyncSession, skip: int, limit: int) -> list[models.Recipe]:
    """
    Retorna las recetas más populares (con más likes).
    """
    query = (
        select(models.Recipe)
        .options(selectinload(models.Recipe.owner), selectinload(models.Recipe.liked_by_users))
        .outerjoin(models.user_likes_association)
        .group_by(models.Recipe.id)
        .order_by(func.count(models.user_likes_association.c.user_id).desc())
        .offset(skip)
        .limit(limit)
    )
    result = await db.execute(query)
    return list(result.scalars().all())

# --- CRUD de Interactions ---
async def like_recipe(db: AsyncSession, recipe: models.Recipe, user: models.User) -> models.Recipe:
    """
    Añade un like a una receta por parte de un usuario.
    """
    if user not in recipe.liked_by_users:
        recipe.liked_by_users.append(user)
        await db.commit()
        await db.refresh(recipe, attribute_names=["id", "name", "description", "image_url", "ingredients", "steps", "owner_id", "owner", "liked_by_users"])
    return recipe

async def unlike_recipe(db: AsyncSession, recipe: models.Recipe, user: models.User) -> models.Recipe:
    """
    Remueve un like de una receta por parte de un usuario.
    """
    if user in recipe.liked_by_users:
        recipe.liked_by_users.remove(user)
        await db.commit()
        await db.refresh(recipe, attribute_names=["id", "name", "description", "image_url", "ingredients", "steps", "owner_id", "owner", "liked_by_users"])
    return recipe

async def create_report(db: AsyncSession, report_data: schemas.ReportCreate, user_id: int) -> models.Report | None:
    """
    Crea un reporte de una receta por parte de un usuario.
    """
    recipe = await get_recipe_by_id(db, report_data.recipe_id)
    if not recipe:
        return None

    db_report = models.Report(
        recipe_id=report_data.recipe_id,
        reporter_id=user_id
    )
    db.add(db_report)
    await db.commit()
    await db.refresh(db_report, attribute_names=["id", "created_at", "reporter", "recipe"])
    return db_report

# --- CRUD de RecipeList ---
async def create_user_recipe_list(db: AsyncSession, list_data: schemas.RecipeListCreate, user_id: int) -> models.RecipeList:
    """
    Crea una lista de recetas para un usuario.
    """
    db_list = models.RecipeList(
        **list_data.model_dump(),
        owner_id=user_id
    )
    db.add(db_list)
    await db.commit()
    await db.refresh(db_list, attribute_names=["recipes", "owner"])
    return db_list

async def get_user_recipe_lists(db: AsyncSession, user_id: int) -> list[models.RecipeList]:
    """
    Retorna todas las listas de recetas de un usuario.
    """
    query = select(models.RecipeList).filter(models.RecipeList.owner_id == user_id).options(selectinload(models.RecipeList.recipes))
    result = await db.execute(query)
    return list(result.scalars().all())

async def get_recipe_list_by_id(db: AsyncSession, list_id: int, user_id: int) -> models.RecipeList | None:
    """
    Retorna una lista de recetas por su id y el id del usuario propietario.
    """
    query = select(models.RecipeList).filter(
        models.RecipeList.id == list_id,
        models.RecipeList.owner_id == user_id
    ).options(selectinload(models.RecipeList.recipes))
    result = await db.execute(query)
    return result.scalar_one_or_none()

async def add_recipe_to_list(db: AsyncSession, list_id: int, recipe_id: int, user_id: int) -> models.RecipeList | None:
    """
    Agrega una receta a una lista de recetas.
    """
    db_recipe_list = await get_recipe_list_by_id(db, list_id, user_id)
    db_recipe = await get_recipe_by_id(db, recipe_id)

    if db_recipe and db_recipe_list and db_recipe not in db_recipe_list.recipes:
        db_recipe_list.recipes.append(db_recipe)
        await db.commit()
        await db.refresh(db_recipe_list, attribute_names=["id", "name", "owner_id", "recipes"])
    
    return db_recipe_list

async def remove_recipe_from_list(db: AsyncSession, list_id: int, recipe_id: int, user_id: int) -> models.RecipeList | None:
    """
    Elimina una receta de una lista de recetas.
    """
    db_recipe_list = await get_recipe_list_by_id(db, list_id, user_id)
    db_recipe = await get_recipe_by_id(db, recipe_id)

    if db_recipe and db_recipe_list and db_recipe in db_recipe_list.recipes:
        db_recipe_list.recipes.remove(db_recipe)
        await db.commit()
        await db.refresh(db_recipe_list, attribute_names=["id", "name", "owner_id", "recipes"])
    
    return db_recipe_list