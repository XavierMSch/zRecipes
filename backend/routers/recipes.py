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

@router.get("/{recipe_id}", response_model=schemas.Recipe)
async def read_recipe(
    recipe_id: int,
    db: AsyncSession = Depends(database.get_db)
):
    """
    Endpoint para retornar una receta por su id.
    """
    db_recipe = await crud.get_recipe_by_id(db, recipe_id=recipe_id)
    if db_recipe is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Receta no encontrada")
    return db_recipe