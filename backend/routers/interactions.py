from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from .. import schemas, models, crud, security, database

router = APIRouter(
    tags=["Interacciones"],
    dependencies=[Depends(security.get_current_user)]
)

@router.post("/like/{recipe_id}", response_model=schemas.Recipe)
async def like_recipe(
    recipe_id: int,
    db: AsyncSession = Depends(database.get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    """
    Endpoint para marcar con like una receta por parte de un usuario.
    """
    db_recipe = await crud.get_recipe_by_id(db, recipe_id=recipe_id)
    if not db_recipe:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Receta no encontrada")
    
    return await crud.like_recipe(db, db_recipe, current_user)

@router.post("/unlike/{recipe_id}", response_model=schemas.Recipe)
async def unlike_recipe(
    recipe_id: int,
    db: AsyncSession = Depends(database.get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    """
    Endpoint para remover un like de una receta por parte de un usuario.
    """
    db_recipe = await crud.get_recipe_by_id(db, recipe_id=recipe_id)
    if not db_recipe:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Receta no encontrada")
    
    return await crud.unlike_recipe(db, db_recipe, current_user)

@router.post("/report/", response_model=schemas.Report, status_code=status.HTTP_201_CREATED)
async def report_recipe(
    report_data: schemas.ReportCreate,
    db: AsyncSession = Depends(database.get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    """
    Endpoint para reportar una receta.
    """
    report = await crud.create_report(db, report_data, current_user.id)
    if not report:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="La receta a reportar no existe")
    return report