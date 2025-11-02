from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from .routers import auth, recipes, interactions, recipe_lists

app = FastAPI(
    title="API de zRecipes",
)

# Configuración de CORS para que Ionic se pueda conectar al backend
origins = [
    "http://localhost",
    "http://localhost:8100", # Puerto de Ionic
    "http://localhost:4200" # Puerto de Angular
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"message": "Error interno del servidor."},
    )

app.include_router(auth.router)
app.include_router(recipes.router)
app.include_router(interactions.router)
app.include_router(recipe_lists.router)
