from datetime import timedelta, datetime, timezone
from passlib.context import CryptContext
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
import models, database, schemas, crud

# Contexto para el helper de contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Configuración para JWT
SECRET_KEY = "SECRET_KEY_CAMBIAR_LUEGO"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

# Esquema para FastAPI
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Verifica que la contraseña en texto plano sea igual a la hasheada
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    # Retorna la contraseña hasheada
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    # Crea un token JWT nuevo
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(database.get_db)) -> models.User:
    # Obtener el usuario actualmente autenticado.
    # Decodifica el token, valida al usuario y lo retorna.

    # Exception si el token no es válido
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciales no fueron posibles de validar",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        # Decodificar el JWT
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        email: str | None = payload.get("sub")
        if email is None:
            raise credentials_exception
        
        token_data = schemas.TokenData(sub=email)
    except JWTError:
        raise credentials_exception
    
    user = await crud.get_user_by_email(db, email=token_data.sub)
    if user is None:
        raise credentials_exception
    
    return user

async def get_current_admin_user(current_user: models.User = Depends(get_current_user)) -> models.User:
    # Verifica si el usuario actual es admin
    # Reutiliza get_current_user como dependencia

    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="El usuario no tiene permisos de administrador"
        )
    return current_user