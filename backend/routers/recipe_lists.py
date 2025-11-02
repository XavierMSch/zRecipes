from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from .. import crud, models, schemas, security, database

router = APIRouter(
    prefix="/recipe-lists",
    tags=["Listas de Recetas"],
    dependencies=[Depends(security.get_current_user)]
)

@router.post("/", response_model=schemas.RecipeList, status_code=status.HTTP_201_CREATED)
async def create_recipe_list(
    list_data: schemas.RecipeListCreate,
    db: AsyncSession = Depends(database.get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    """
    Endpoint para crear una nueva lista de recetas para un usuario logueado.
    """
    return await crud.create_user_recipe_list(db, list_data, user_id=current_user.id)

@router.get("/", response_model=list[schemas.RecipeList])
async def get_recipe_lists(
    db: AsyncSession = Depends(database.get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    """
    Endpoint para obtener todas las listas de recetas del usuario logueado.
    """
    return await crud.get_user_recipe_lists(db, user_id=current_user.id)

@router.get("/{list_id}", response_model=schemas.RecipeList)
async def get_single_recipe_list(
    list_id: int,
    db: AsyncSession = Depends(database.get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    """
    Endpoint para obtener una lista de recetas específica del usuario logueado.
    """
    db_list = await crud.get_recipe_list_by_id(db, list_id, current_user.id)
    if db_list is None or db_list.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lista de recetas no encontrada")
    return db_list

@router.post("/{list_id}/add-recipe/{recipe_id}", response_model=schemas.RecipeList)
async def add_recipe_to_list(
    list_id: int,
    recipe_id: int,
    db: AsyncSession = Depends(database.get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    """
    Endpoint para agregar una receta a una lista de recetas del usuario logueado.
    """
    db_list = await crud.get_recipe_list_by_id(db, list_id, current_user.id)
    if db_list is None or db_list.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lista de recetas no encontrada")

    db_recipe = await crud.get_recipe_by_id(db, recipe_id)
    if db_recipe is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Receta no encontrada")

    updated_list = await crud.add_recipe_to_list(db, list_id, recipe_id, current_user.id)
    return updated_list

@router.post("/{list_id}/remove/{recipe_id}", response_model=schemas.RecipeList)
async def remove_recipe_from_list(
    list_id: int,
    recipe_id: int,
    db: AsyncSession = Depends(database.get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    """
    Endpoint para remover una receta de una lista de recetas del usuario logueado.
    """
    db_list = await crud.get_recipe_list_by_id(db, list_id, current_user.id)
    if db_list is None or db_list.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lista de recetas no encontrada")

    db_recipe = await crud.get_recipe_by_id(db, recipe_id)
    if db_recipe is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Receta no encontrada")

    updated_list = await crud.remove_recipe_from_list(db, list_id, recipe_id, current_user.id)
    return updated_list