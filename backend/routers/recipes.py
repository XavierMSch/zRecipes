from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from .. import schemas, models, security, crud, database

router = APIRouter(
    prefix="/recipes",
    tags=["Recetas"]
)

@router.post("/", response_model=schemas.Recipe, status_code=status.HTTP_201_CREATED)
async def create_recipe(
    recipe: schemas.RecipeCreate,
    db: AsyncSession = Depends(database.get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    """
    Endpoint para crear una nueva receta para un usuario logueado.
    """
    return await crud.create_user_recipe(db=db, recipe=recipe, user_id=current_user.id)

@router.delete("/{recipe_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_recipe(
    recipe_id: int,
    db: AsyncSession = Depends(database.get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    """
    Endpoint para eliminar una receta del usuario logueado.
    """
    db_recipe = await crud.get_recipe_by_id(db, recipe_id=recipe_id)
    if db_recipe is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Receta no encontrada")
    if db_recipe.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Sin permiso para eliminar esta receta")
    await crud.delete_recipe(db, recipe_id=recipe_id)
    return

@router.get("/", response_model=list[schemas.RecipeWithoutOwner])
async def read_recipes(
    skip: int = 0,
    limit: int = 20,
    q: str | None = None,
    db: AsyncSession = Depends(database.get_db)
):
    """
    Endpoint para retornar una lista de recetas.
    """
    if q:
        return await crud.search_recipes_by_name(db=db, search_term=q, skip=skip, limit=limit)
    return await crud.get_recipes(db=db, skip=skip, limit=limit)

@router.get("/my-recipes/", response_model=list[schemas.RecipeWithoutOwner])
async def read_my_recipes(
    skip: int = 0,
    limit: int = 20,
    db: AsyncSession = Depends(database.get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    """
    Endpoint para retornar las recetas del usuario logueado.
    """
    return await crud.get_recipes_by_owner(db=db, owner_id=current_user.id, skip=skip, limit=limit)

@router.get("/popular/", response_model=list[schemas.RecipeWithoutOwner])
async def read_popular_recipes(
    skip: int = 0,
    limit: int = 20,
    db: AsyncSession = Depends(database.get_db)
):
    """
    Endpoint para retornar las recetas más populares (con más likes).
    """
    return await crud.get_popular_recipes(db=db, skip=skip, limit=limit)

@router.get("/{recipe_id}", response_model=schemas.Recipe)
async def read_recipe(
    recipe_id: int,
    db: AsyncSession = Depends(database.get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    """
    Endpoint para retornar una receta por su id.
    """
    db_recipe = await crud.get_recipe_by_id(db, recipe_id=recipe_id)
    if db_recipe is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Receta no encontrada")
    
    recipe_dict = schemas.Recipe.model_validate(db_recipe).model_dump()

    if current_user:
        recipe_dict['is_liked_by_current_user'] = current_user in db_recipe.liked_by_users

    return recipe_dict

