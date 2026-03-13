# Frontend de AutoSphere

Este frontend es una aplicación construida con **Vue 3 + Vite + Vue Router + Pinia + Vuetify**.  
La estructura actual fue organizada para que el equipo pueda trabajar en paralelo sin depender todavía del backend.

---

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js**
- **npm**
- **Git**

> **Nota:** El frontend ya cuenta con **ESLint** y **Prettier** configurados en el proyecto. No es necesario agregar otra capa de lint o formateo.

---

## Preparación del frontend

### 1. Entrar a la carpeta del frontend

Desde la raíz del proyecto:

```bash
cd frontend
```

### 2. Instalar dependencias

```bash
npm ci
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

### 4. Ejecutar chequeos manuales

```bash
npm run lint
npm run format:check
npm run test
npm run build
```

> [!IMPORTANT]
> **Advertencia:** Los chequeos del frontend deben pasar antes de abrir un PR.  
> En este proyecto, `lint`, `format:check`, `test` y `build` forman el piso mínimo para validar que el scaffold, las rutas y los layouts no se hayan roto.

---

## Sesión fake de desarrollo

Mientras no exista backend ni autenticación real, el proyecto contempla una **sesión de desarrollo** para inspeccionar layouts y rutas protegidas.

### ¿Cómo funciona?

El frontend usa un store de sesión (`src/stores/auth.js`) con helpers como:

- `startSession(...)`
- `clearSession()`
- `isAuthenticated`
- `user`
- `roles`
- `primaryRole`

Encima de eso, se puede montar un **panel global de cambio de sesión** visible solo en desarrollo:

- `src/components/dev/DevSessionSwitcher.vue`
- renderizado desde `App.vue`
- visible únicamente cuando `import.meta.env.DEV` sea verdadero

### ¿Para qué sirve?

Permite cambiar rápidamente entre:

- invitado
- comprador
- vendedor
- arrendador
- admin

Sin backend, esto sirve para revisar:

- `PublicLayout`
- `AuthLayout`
- `DashboardLayout`
- `AdminLayout`

Y también para abrir rutas protegidas como:

- `/panel/comprador`
- `/panel/vendedor`
- `/panel/arrendador`
- `/admin`

### Regla de retiro

Cuando exista autenticación real, el panel se elimina borrando:

- `src/components/dev/DevSessionSwitcher.vue`
- su import/render en `App.vue`

No debe mezclarse con la autenticación final.

---

## Datos mock para desarrollo

Mientras no exista backend, el frontend puede trabajar con **JSON fake**.

### Regla principal

Las vistas **no** deben importar archivos mock directamente.  
Las vistas deben consumir **servicios**. Los servicios son quienes leen mock JSON por ahora.

Flujo esperado:

1. La vista llama un servicio.
2. El servicio devuelve datos desde `src/mocks/...`.
3. Cuando el backend esté listo, se reemplaza la implementación del servicio.
4. La vista no necesita reescribirse.

### Carpeta de mocks

La carpeta esperada es:

```text
src/mocks/
```

El paquete de mocks incluye datos para:

- `auth/`
- `public/`
- `catalog/`
- `appointments/`
- `buyer/`
- `seller/`
- `lessor/`
- `admin/`
- `account/`
- `shared/`

### Uso práctico

Si solo quieres integrar mocks nuevos, basta con arrastrar y soltar la carpeta `mocks/` dentro de:

```text
frontend/src/
```

Eso es suficiente **siempre que** los servicios del proyecto ya apunten a `src/mocks/...`.

Ejemplos de servicios esperados:

- `src/services/auth.js`
- `src/services/catalog.js`
- `src/services/appointments.js`
- `src/services/account.js`

> **Nota:** Si una pantalla todavía importa datos directos o no tiene servicio, hay que crear esa capa antes de usar los mocks de forma consistente.

---

## Organización actual del frontend

### Layouts

La responsabilidad del shell ya no vive en `App.vue`.

Layouts disponibles:

- `src/layouts/PublicLayout.vue`
- `src/layouts/AuthLayout.vue`
- `src/layouts/DashboardLayout.vue`
- `src/layouts/AdminLayout.vue`

`App.vue` solo debe renderizar:

- el root de Vuetify
- el `router-view`
- y, en desarrollo, el panel global de sesión fake

### Rutas

La organización del router es modular:

- `src/router/routes/public.js`
- `src/router/routes/auth.js`
- `src/router/routes/app.js`
- `src/router/routes/admin.js`
- `src/router/routes/utility.js`

Todas las páginas en rutas deben cargarse con **lazy imports**.

### Vistas

Las vistas están agrupadas por dominio:

- `src/views/public`
- `src/views/auth`
- `src/views/catalog`
- `src/views/appointments`
- `src/views/buyer`
- `src/views/seller`
- `src/views/lessor`
- `src/views/admin`
- `src/views/account`
- `src/views/utility`

Cada vista puede tener:

- `index.vue`
- `styles.css`

---

## Vistas protegidas

Estas vistas ya tenían trabajo visual previo y deben preservarse:

- `src/views/public/home/index.vue`
- `src/views/auth/login/index.vue`
- `src/views/appointments/calendar/index.vue`
- `src/views/catalog/listings/index.vue`
- `src/views/catalog/listing-detail/index.vue`

### Cambios permitidos

- mover o renombrar archivo
- actualizar imports/exports
- actualizar rutas
- integrar con layouts
- hacer ajustes mínimos de compatibilidad

### Cambios no permitidos

- rediseñar template
- rehacer composición visual
- cambiar copy sin aprobación
- reestilizar por preferencia técnica
- refactorizar solo porque “se vería más limpio”

Si una vista protegida requiere un cambio, debe ser pequeño y debe explicarse en el PR.

---

## Accesos y roles

La lógica actual usa `meta.requiresAuth`, `meta.requiresGuest` y `meta.roles`.

### Matriz de acceso

| Área             | Requiere auth | Roles                         |
| ---------------- | ------------- | ----------------------------- |
| Público          | No            | cualquiera                    |
| Auth             | Solo invitado | invitado                      |
| Panel comprador  | Sí            | `buyer`                       |
| Panel vendedor   | Sí            | `seller`                      |
| Panel arrendador | Sí            | `lessor`                      |
| Cuenta           | Sí            | cualquier usuario autenticado |
| Admin            | Sí            | `admin`                       |
| Utility          | No            | cualquiera                    |

Si esta lógica cambia, debe modificarse en un solo lugar:

```text
src/router/guards.js
```

---

## Calidad de código

Este frontend utiliza las mismas herramientas de calidad ya presentes en el proyecto principal:

- **ESLint**
- **Prettier**

Si una validación falla, usa:

```bash
npm run lint:fix
npm run format
```

Y después vuelve a correr:

```bash
npm run lint
npm run format:check
npm run test
npm run build
```

---

## Pruebas mínimas del scaffold

Las pruebas actuales no son de negocio. Protegen la arquitectura base.

Cubren:

- existencia y composición de rutas modulares
- guards y store de auth
- layouts
- navegación pública relevante

Objetivo:

- evitar que el scaffold se rompa mientras el equipo implementa features

---

## Qué agregar en el lugar correcto

Usa esta regla rápida:

- **Nueva página con URL propia:** `src/views/...` + su módulo de rutas correspondiente
- **Lógica de acceso:** `src/router/guards.js`
- **Estado de sesión:** `src/stores/auth.js`
- **Datos de negocio:** `src/services/...`
- **Shell visual de una zona:** layout correspondiente
- **JSON fake:** `src/mocks/...`

---

## Estructura resumida

```text
/frontend
  /src
    /components
    /layouts
    /mocks
    /router
    /services
    /stores
    /views
```

---

## Qué revisar antes de abrir un PR

1. No romper vistas protegidas.
2. Poner cada ruta nueva en su módulo correcto.
3. Mantener datos mock detrás de servicios.
4. Probar el flujo con el panel de sesión fake si la ruta depende de roles.
5. Ejecutar:
   - `npm run lint`
   - `npm run format:check`
   - `npm run test`
   - `npm run build`

---

## Estructura del frontend

- `/src/components`: Componentes reutilizables y soporte visual.
- `/src/layouts`: Shells por área de navegación.
- `/src/mocks`: JSON fake para desarrollo sin backend.
- `/src/router`: Ensamble del router, guards y módulos de rutas.
- `/src/services`: Capa de acceso a datos.
- `/src/stores`: Estado global con Pinia.
- `/src/views`: Páginas por dominio funcional.

---
