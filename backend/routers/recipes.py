from fastapi import APIRouter

router = APIRouter(prefix="/recipes")

@router.get("/")
async def read_recipes(skip: int = 0, limit: int = 100):
    pass

@router.get("/{recipe_id}")
async def read_recipe(recipe_id: int):
    pass

