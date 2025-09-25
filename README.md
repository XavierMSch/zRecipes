# zRecipes
# Presentado por:
- Ignacio Córdova
- Xavier Montoya
- Diego Negrín

# Sistema de comunidad de recetas

##  Índice
1. [Resumen del Proyecto](#resumen-del-proyecto)
2. [Requerimientos](#requerimientos)
3. [Arquitectura de la Información](#arquitectura-de-la-información)
3. [Diseño de prototipos](#prototipo-de-diseño)
4. [Librerías en Angular](#liberías-usadas-con-angular)

## Resumen del Proyecto


## Requerimientos

## Roles del Sistema
- **Administrador**: Control total sobre el sistema.
- **Usuario**: Puede visualizar, crear y editar recetas.

## Requerimientos Funcionales por Rol

### Rol-Usuario

- **RF-USR-01**: El usuario puede agregar nuevas recetas ingresando:
  - Nombre
  - Imagen de portada
  - Descripción
  - Ingredientes
  - Pasos con imágenes opcionales
- **RF-USR-02**: El usuario puede buscar recetas a través de un buscador.
- **RF-USR-03**: El usuario puede filtrar los resultados de búsqueda.
- **RF-USR-04**: El usuario puede visualizar una receta del sistema.
- **RF-USR-05**: El usuario puede guardar recetas en colecciones.

### Rol-Administrador

- **RF-ADM-01**: El administrador puede registrar nuevos productos.
- **RF-ADM-02**: El administrador puede editar cualquier producto existente.
- **RF-ADM-03**: El administrador puede eliminar productos del inventario (borrado lógico).
- **RF-ADM-04**: El administrador puede configurar alertas de stock mínimo.
- **RF-ADM-05**: El administrador puede gestionar usuarios y asignar roles.

---

## Requerimientos No Funcionales

- **RNF-01: Tiempo de respuesta**
  - El sistema debe responder a operaciones clave (registro, edición, búsqueda) en menos de **2 segundos** en el 95% de los casos.

- **RNF-02: Seguridad**
  - Solo usuarios autenticados pueden ingresar al sistema.
  - Los roles deben restringir el acceso a funciones según permisos (Administrador, Editor, Visualizador).
  - Acceso protegido por HTTPS y almacenamiento seguro de contraseñas.

- **RNF-03: Usabilidad**
  - La interfaz debe ser intuitiva y fácil de usar.
  - Compatible con pantallas móviles y escritorio (responsive design).

- **RNF-04: Compatibilidad**
  - Compatible con los navegadores:
    - Google Chrome
    - Mozilla Firefox
    - Microsoft Edge
    - Safari

- **RNF-05: Escalabilidad**
  - El sistema debe ser capaz de manejar más de **10,000 productos** sin pérdida notable de rendimiento.


## Requerimientos No Funcionales

### RNF-01: Tiempo de respuesta
- El sistema debe responder a solicitudes de registro, edición o búsqueda en menos de **2 segundos** en el 95% de los casos.

### RNF-02: Seguridad
- Solo usuarios autenticados pueden gestionar productos.
- Debe haber control de roles: administrador, editor, visualizador.

### RNF-03: Usabilidad
- La interfaz debe ser intuitiva y fácil de usar.
- Debe seguir principios de diseño responsive para adaptarse a pantallas móviles y de escritorio.

### RNF-04: Compatibilidad
- El sistema debe funcionar correctamente en los siguientes navegadores:
  - Google Chrome (última versión)
  - Mozilla Firefox
  - Microsoft Edge
  - Safari

### RNF-05: Escalabilidad
- El sistema debe poder manejar al menos **10,000 productos** sin disminución significativa del rendimiento
---
## Arquitectura de la Información 
[Estructura de Navegación](https://whimsical.com/escuelainf-4qgXnPptro4CqvEugsGNNZ )

---

## Prototipo de diseño 
[Figma - Prototipo de Gestión de Productos]()

---
## Liberías usadas con Angular
- Bootstrap

## Tecnologías
- **Ionic Framework** (v7+)
- **Angular** (v15+)
- **TypeScript**
- **Capacitor** (para plugins nativos, si aplica)
- **SASS** (para estilos)
- **RxJS** (para manejo reactivo)
- **Angular Router** (para navegación entre vistas)