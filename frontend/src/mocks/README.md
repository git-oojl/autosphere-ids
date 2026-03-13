# mocks

Datos fake en JSON para desarrollo frontend sin backend.

## Uso recomendado

1. Copia esta carpeta a `frontend/src/mocks`.
2. Consume estos archivos desde `src/services/...`, no directamente desde las vistas.
3. Cuando el backend esté listo, reemplaza la lógica de los servicios y conserva las vistas.

## Áreas cubiertas

- `auth/`: sesiones y usuarios demo
- `public/`: contenido para home, about, contact y FAQ
- `catalog/`: listados, filtros y detalles
- `appointments/`: agenda, citas y slots
- `buyer/`: dashboard, guardados e historial
- `seller/`: dashboard, publicaciones y opciones de formulario
- `lessor/`: rentas y detalle
- `admin/`: dashboard, usuarios, reportes y suspensiones
- `account/`: perfil y seguridad
