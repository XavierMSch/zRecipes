# zRecipes
***Sistema de comunidad de conocimiento colaborativo de recetas***

## Presentado por:
- Ignacio Córdova
- Xavier Montoya
- Diego Negrín

## Índice
1. [Resumen del Proyecto](#resumen-del-proyecto)
2. [Instrucciones Ejecución](#instrucciones-ejecución)
3. [Pruebas Solicitudes HTTP](#pruebas-solicitudes-http)
4. [Roles del Sistema](#roles-del-sistema)
5. [Requerimientos](#requerimientos)
6. [Arquitectura de la Información](#arquitectura-de-la-información)
7. [Diseño de Prototipos](#prototipo-de-diseño)
8. [Experiencia de Usuario](#experiencia-de-usuario)
9. [Tecnologías](#tecnologías)


## Resumen del Proyecto
zRecipes es una aplicación diseñada para que los usuarios puedan crear, guardar y compartir recetas en un solo lugar, y además permite crear variaciones de otras recetas para expresar la creatividad en la cocina. El proyecto se desarrolló dentro del curso INF3245 - Ingeniería Web y Móvil de la Pontificia Universidad Católica de Valparaíso. La aplicación se desarrolla utilizando el framework Ionic con Angular para el front-end.

## Instrucciones Ejecución

1. En una terminal, crear y activar un entorno virtual de python.

***Windows***
python -m venv .venv
.venv\Scripts\activate.bat
pip install -r \backend\requirements.txt

***Linux/MacOS***
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt

2. Levantar servidor de FastAPI

***Windows***
fastapi dev .\backend\main.py

***Linux/MacOS***
fastapi dev backend/main.py

Si encuentra un error de dependencias, ejecute active el entorno virtual nuevamente y vuelva a levantar el servidor de FastAPI.

3. En otra terminal, moverse al directorio de la aplicación Ionic y correrla.

cd zRecipes
ionic serve

## Pruebas Solicitudes HTTP

En el directorio zRecipesTest se encuentran las imágenes de las solicitudes HTTP con Bruno.

## Roles del Sistema
- **Administrador**: Puede eliminar recetas publicadas y vetar usuarios.
- **Usuario**: Puede visualizar, buscar, crear y editar recetas.

## Requerimientos

### Requerimientos Funcionales

#### Rol-Usuario

- **RF-USR-01**: El sistema debe permitir al usuario crear una receta.
- **RF-USR-02**: El sistema debe permitir al usuario eliminar una receta propia.
- **RF-USR-03**: El sistema debe mostrar al usuario una lista de recetas publicadas, esta lista debe mostrar el nombre de la receta, junto a una imagen.
- **RF-USR-04**: El sistema debe permitir al usuario guardar recetas en colecciones.
- **RF-USR-05**: El sistema debe permitir al usuario navegar a través de sus recetas guardadas.
- **RF-USR-06**: El sistema debe permitir al usuario reportar recetas.


#### Rol-Administrador
- **RF-ADM-01**: El sistema debe permitir al administrador visualizar recetas que hayan sido reportadas.
- **RF-ADM-02**: El sistema debe permitir al administrador eliminar una receta de otro usuario.
- **RF-ADM-03**: El sistema debe permitir al administrador vetar la cuenta de un usuario.
---

### Requerimientos No Funcionales

- **RNF-01**: La interfaz implementada en el sistema debe ser intuitiva para el usuario 
- **RNF-02**:  Solo usuarios autenticados pueden ingresar al sistema.
- **RNF-03**: El sistema debe controlar el acceso a funciones en base a permisos de roles (Administrador, Usuario).
- **RNF-04**: El sistema debe ser compatible con pantallas móviles y escritorio (responsive design).
- **RNF-05**:  Compatible con los navegadores:
    - Google Chrome
    - Mozilla Firefox
    - Safari
- **RNF-06**:  Las imágenes subidas al sistema deben estar en formato png, jpg o jpeg.
- **RNF-07**: Los administradores deben poder acceder a la base de datos de la aplicación.


## Arquitectura de la Información 
[Estructura de Navegación](https://whimsical.com/web-y-movil-PZuFpkK7MZCCMFupwKgkWc)\
[Userflow Diagram](https://whimsical.com/web-y-movil-2-GQ7umSDjNrvn2kFVQ4VMbQ)

## Prototipo de Diseño 
[Figma - Prototipo versión web](https://www.figma.com/proto/Jmyy4ZCMmLQWhFumfUQfd6/zRecipes?node-id=3396-4412&t=Sekj0D7XzfvoQ3X9-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=3396%3A4412)\
[Figma - Prototipo versión móvil](https://www.figma.com/proto/Jmyy4ZCMmLQWhFumfUQfd6/zRecipes?node-id=5331-1801&p=f&t=ae14TDLrTogItKkq-1&scaling=min-zoom&content-scaling=fixed&page-id=5331%3A1554)

## Experiencia de Usuario
En esta sección se mencionan los principios y patrones relevantes para la experiencia de usuario en las UIs de la aplicación. 

### Principios de UX
- **Consistencia**
- **Usabilidad**
- **Feedback**

### Patrones de Diseño UX y Accesibilidad
- **Navegación por pestañas**
- **Presentación de contenido en tarjetas**
- **Alto contraste entre colores de fondo y contenido**
- **Texto alternativo en imágenes**
- **Opciones comprensibles**

## Tecnologías
- **Ionic Framework**
- **Angular**
- **TypeScript**
- **SCSS**
- **Angular Router**
