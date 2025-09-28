# zRecipes
## Presentado por:
- Ignacio Córdova
- Xavier Montoya
- Diego Negrín

## Sistema de comunidad de recetas

## Índice
1. [Resumen del Proyecto](#resumen-del-proyecto)
2. [Instrucciones de Instalación](#instrucciones-de-instalación)
3. [Roles del Sistema](#roles-del-sistema)
4. [Requerimientos](#requerimientos)
5. [Arquitectura de la Información](#arquitectura-de-la-información)
6. [Diseño de prototipos](#prototipo-de-diseño)
7. [Tecnologías](#tecnologías)


## Resumen del Proyecto
zRecipes es una aplicación diseñada para que los usuarios puedan crear, guardar y compartir recetas en un solo lugar, y además permite crear variaciones de otras recetas para expresar la creatividad en la cocina. El proyecto se desarrolló dentro del curso INF3245 - Ingeniería Web y Móvil de la Pontificia Universidad Católica de Valparaíso. La aplicación se desarrolla utilizando el framework Ionic con Angular para el front-end.

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

## Prototipo de diseño 
[Figma - Prototipo versión web](https://www.figma.com/proto/Jmyy4ZCMmLQWhFumfUQfd6/zRecipes?node-id=3396-4412&t=Sekj0D7XzfvoQ3X9-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=3396%3A4412)\
[Figma - Prototipo versión móvil](https://www.figma.com/proto/Jmyy4ZCMmLQWhFumfUQfd6/zRecipes?node-id=5331-1801&p=f&t=ae14TDLrTogItKkq-1&scaling=min-zoom&content-scaling=fixed&page-id=5331%3A1554)


## Tecnologías
- **Ionic Framework**
- **Angular**
- **TypeScript**
- **SCSS**
- **Angular Router**
