from pydantic import BaseModel, EmailStr, ConfigDict
from datetime import datetime

# Schema base para que pydantic sea compatible con sqlalchemy
class BaseSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

# --- Schemas para autenticación ---
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    sub: str | None = None # subject: user_id

# --- Schemas internos para Recipe ---
class IngredientItem(BaseModel):
    quantity: str
    ingredient_name: str

class StepItem(BaseModel):
    step_number: int
    step_description: str
    image_url: str | None = None

# --- Schemas de Recipe ---
class RecipeBase(BaseModel):
    name: str
    description: str | None = None
    image_url: str | None = None
    ingredients: list[IngredientItem]
    steps: list[StepItem]

class RecipeCreate(RecipeBase):
    # owner se obtiene del usuario logueado
    pass

class RecipeUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    image_url: str | None = None
    ingredients: list[IngredientItem] | None = None
    steps: list[StepItem] | None = None

# Schemas para read de Recipe
class UserInRecipe(BaseSchema):
    id: int
    username: str

class Recipe(RecipeBase, BaseSchema):
    id: int
    owner_id: int
    owner: UserInRecipe

# --- Schemas de User ---
class UserBase(BaseModel):
    username: str
    email: EmailStr
    region: str
    comuna: str

class UserCreate(UserBase):
    rut: str
    password: str

class UserUpdate(BaseModel):
    username: str | None = None
    email: EmailStr | None = None
    region: str | None = None
    comuna: str | None = None

# Schemas para read de User
class RecipeInUser(BaseSchema):
    id: int
    name: str
    description: str | None = None
    image_url: str | None = None

class RecipeListInUser(BaseSchema):
    id: int
    name: str

class User(UserBase, BaseSchema):
    id: int
    is_admin: bool

    recipes: list[RecipeInUser] = []
    recipe_lists: list[RecipeListInUser] = []

# --- Schemas de RecipeList ---
class RecipeListBase(BaseModel):
    name: str

class RecipeListCreate(RecipeListBase):
    # owner se obtiene del usuario logueado
    pass

class RecipeListUpdate(BaseModel):
    name: str | None = None

class RecipeList(RecipeListBase, BaseSchema):
    id: int
    owner_id: int
    recipes: list[RecipeInUser] = []

# --- Schemas de Report ---
class ReportCreate(BaseModel):
    recipe_id: int
    # reporter_id se obtiene de usuario logueado

class Report(BaseSchema):
    id: int
    created_at: datetime
    reporter: UserInRecipe
    recipe: RecipeInUser

