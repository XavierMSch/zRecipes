from pydantic import BaseModel

class RecipeBase(BaseModel):
    title: str
    # TODO: Terminar

class RecipeCreate(RecipeBase):
    pass

class Recipe(RecipeBase):
    id: int
    recipe_owner: int

    class Config:
        orm_mode: True # type: ignore

class UserCreate(BaseModel):
    username: str
    rut: str
    email: str
    region: str
    comuna: str
    password: str

class User(BaseModel):
    id: int
    is_admin: bool

    class Config:
        orm_mode: True # type: ignore


