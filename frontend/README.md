# Frontend de AutoSphere

Aplicación frontend construida con **Vue 3**, **Vite**, **Vue Router**, **Pinia** y **Vuetify**.

La base actual permite desarrollar vistas, rutas y layouts por dominio sin depender todavía del backend.

## Requisitos previos

- **Node.js**
- **npm**
- **Git**

> El proyecto ya incluye **ESLint** y **Prettier**. No agregues herramientas paralelas de lint o formateo.

## Puesta en marcha

Desde la raíz del proyecto:

```bash
cd frontend
npm ci
npm run dev
```

## Validaciones mínimas

Antes de abrir un PR, ejecuta:

```bash
npm run lint
npm run format:check
npm run test
npm run build
```

Para corregir formato o lint:

```bash
npm run lint:fix
npm run format
```

## Sesión fake de desarrollo

Mientras no exista autenticación real, el proyecto usa una sesión fake para revisar layouts y rutas protegidas.

Archivos involucrados:

```text
src/stores/auth.js
src/components/dev/DevSessionSwitcher.vue
src/App.vue
```

Contrato mínimo del store:

- `isAuthenticated`
- `user`
- `roles`
- `primaryRole`
- `startSession(...)`
- `clearSession()`
- `hasRole(...)`
- `hasAnyRole(...)`

Modelo real de sesión en desarrollo:

- invitado
- usuario registrado
- admin

Comprador / vendedor / arrendador siguen existiendo como superficies de capacidad dentro de una cuenta autenticada, no como identidades de autenticación separadas.

Rutas útiles para validación:

- `/cuenta/dashboard`
- `/cuenta/mis-citas`
- `/cuenta/publicaciones`
- `/admin`

Cuando exista autenticación real, el switcher debe eliminarse sin afectar la implementación final.

## Datos mock y servicios

Mientras no exista backend, la UI consume datos mock a través de la capa de servicios.

Flujo esperado:

```text
vista -> servicio -> mock
```

Flujo futuro:

```text
vista -> servicio -> backend
```

Reglas:

- Las vistas **no** deben importar archivos `.json` directamente.
- Toda lectura de datos debe pasar por `src/services/...`.
- Los mocks deben vivir en `src/mocks/...`.
- La lógica de transformación, filtrado o mapeo debe vivir en servicios, no en las vistas.

Estructura sugerida de mocks:

```text
src/mocks/
  auth/
  public/
  catalog/
  appointments/
  buyer/
  seller/
  lessor/
  admin/
  account/
  shared/
```

Si se incorpora una carpeta `mocks/` externa, debe copiarse en:

```text
frontend/src/mocks/
```

## Servicios documentados

### `src/services/http.js`

Instancia compartida de Axios preparada para backend real:

- `baseURL: '/api'`
- `timeout: 10000`

Responsabilidad:

- centralizar requests HTTP
- centralizar headers
- preparar manejo futuro de auth, `401` y `403`

### `src/services/mockResponse.js`

Helper actual:

```js
resolveMock(data, (delay = 120));
```

Uso:

- simula asincronía
- devuelve una copia segura de datos mock

### `src/services/auth.js`

- `login(credentials = {})`: simula login; futuro `POST /api/auth/login`
- `logout()`: simula logout; futuro `POST /api/auth/logout`
- `getCurrentSession()`: devuelve sesión actual; futuro `GET /api/me`

### `src/services/catalog.js`

- `getListings(filters = {})`: devuelve listados mock; futuro `GET /api/listings`
- `getListingById(id)`: devuelve detalle mock; futuro `GET /api/listings/:id`

### `src/services/appointments.js`

- `getCalendarEvents()`: futuro `GET /api/appointments/calendar`
- `getBuyerAppointments()`: futuro `GET /api/buyer/appointments`
- `getSellerAppointments()`: futuro `GET /api/seller/appointments`
- `createAppointment(payload = {})`: simula creación; futuro `POST /api/appointments`

### `src/services/account.js`

- `getProfile()`: devuelve perfil mock; futuro `GET /api/account/profile`
- `updatePassword()`: simula actualización; futuro `PATCH /api/account/password`

## Regla para nuevas pantallas

Si una pantalla necesita datos dinámicos, el orden correcto es:

1. definir el mock en `src/mocks/...`
2. exponer una función en `src/services/...`
3. consumirla desde la vista
4. manejar `loading`, `empty` y `error` cuando aplique

No se debe saltar de mock a vista sin pasar por servicios.

## Organización del frontend

### Layouts

`App.vue` solo debe contener:

- root de Vuetify
- `router-view`
- panel de sesión fake en desarrollo

Layouts disponibles:

- `src/layouts/PublicLayout.vue`
- `src/layouts/AuthLayout.vue`
- `src/layouts/DashboardLayout.vue`
- `src/layouts/AdminLayout.vue`

### Router

El router está dividido por módulos:

- `src/router/routes/public.js`
- `src/router/routes/auth.js`
- `src/router/routes/app.js`
- `src/router/routes/admin.js`
- `src/router/routes/utility.js`

Todas las páginas deben cargarse con **lazy imports**.

### Vistas

Las vistas se agrupan por dominio:

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

Cada vista puede incluir:

- `index.vue`
- `styles.css`

## Vistas protegidas

Estas vistas deben preservarse:

- `src/views/public/home/index.vue`
- `src/views/auth/login/index.vue`
- `src/views/appointments/calendar/index.vue`
- `src/views/catalog/listings/index.vue`
- `src/views/catalog/listing-detail/index.vue`

Permitido:

- mover o renombrar archivos
- actualizar imports y exports
- ajustar rutas
- integrar con layouts
- hacer cambios mínimos de compatibilidad

No permitido:

- rediseñar template
- rehacer composición visual
- cambiar copy sin aprobación
- reestilizar por preferencia técnica
- refactorizar sin necesidad funcional

Si una vista protegida requiere cambios, deben ser mínimos y explicados en el PR.

## Acceso y roles

La autorización actual usa:

- `meta.requiresAuth`
- `meta.requiresGuest`
- `meta.roles`

La lógica centralizada vive en:

```text
src/router/guards.js
```

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

Si la política cambia, debe modificarse en `src/router/guards.js`.

## Calidad y pruebas

Herramientas usadas:

- **ESLint**
- **Prettier**

`npm test` debe correrse manualmente como parte del mínimo local, salvo que se configure un hook o CI específico.

Las pruebas actuales cubren la base del scaffold:

- rutas modulares
- guards y store de auth
- layouts
- navegación pública principal

Su objetivo es evitar regresiones estructurales mientras se implementan features.

## Guía rápida de ubicación

- **Nueva página con URL propia:** `src/views/...` + módulo de rutas correspondiente
- **Lógica de acceso:** `src/router/guards.js`
- **Estado de sesión:** `src/stores/auth.js`
- **Datos de negocio:** `src/services/...`
- **Shell visual:** layout correspondiente
- **Datos mock:** `src/mocks/...`

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

## Checklist previo a PR

1. No romper vistas protegidas.
2. Ubicar cada ruta nueva en su módulo correcto.
3. Mantener los datos detrás de servicios.
4. No importar `.json` directamente desde vistas.
5. Probar rutas con sesión fake si dependen de roles.
6. Ejecutar:
   - `npm run lint`
   - `npm run format:check`
   - `npm run test`
   - `npm run build`

## Estructura de carpetas

- `/src/components`: componentes reutilizables y soporte visual
- `/src/layouts`: shells por área de navegación
- `/src/mocks`: datos mock para desarrollo sin backend
- `/src/router`: router, guards y módulos de rutas
- `/src/services`: acceso a datos
- `/src/stores`: estado global con Pinia
- `/src/views`: páginas por dominio funcional

## Criterio general

Mientras no exista backend:

- las vistas renderizan
- los servicios resuelven datos
- los mocks alimentan los servicios
- el store fake solo sirve para validar navegación y layouts

Cuando exista backend, el reemplazo debe ocurrir dentro de la capa de servicios, no en la UI.
