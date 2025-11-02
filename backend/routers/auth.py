from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import timedelta
from .. import schemas, database, crud, security, models

router = APIRouter(
    tags=["Autenticación"]
)

@router.post("/token", response_model=schemas.Token)
async def login_token(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(database.get_db)):
    """
    Endpoint de login. Recibe el formulario con username/password. En este caso username es email.
    """
    user = await crud.get_user_by_email(db, email=form_data.username)

    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrecto",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = security.create_access_token(
        data={"sub": str(user.id)}
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/users/", response_model=schemas.User, status_code=status.HTTP_201_CREATED)
async def register_user(user: schemas.UserCreate, db: AsyncSession = Depends(database.get_db)):
    """
    Endpoint de registro de usuario.
    """
    db_user_email = await crud.get_user_by_email(db, email=user.email)
    if db_user_email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email ya registrado.")
    
    db_user_rut = await crud.get_user_by_rut(db, rut=user.rut)
    if db_user_rut:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Rut ya registrado.")
    
    db_user_username = await crud.get_user_by_username(db, username=user.username)
    if db_user_username:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nombre de usuario ya registrado.")
    
    return crud.create_user(db=db, user=user)

@router.get("/users/me", response_model=schemas.User)
async def read_users_me(current_user: models.User = Depends(security.get_current_user)):
    """
    Endpoint protegido que obtiene el usuario actual logueado.
    """
    return current_user