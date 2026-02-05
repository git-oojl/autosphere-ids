# autosphere-ids

Este proyecto es una aplicación full-stack que utiliza **Django** en el backend y **Vue** en el frontend. Seguimos el estándar de equipo utilizando `uv` para la gestión de dependencias de Python.

---

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

* **uv**: [Instalar uv](https://github.com/astral-sh/uv) (Gestor de paquetes de Python ultra rápido).

```bash
# En macOS y Linux.
curl -LsSf https://astral.sh/uv/install.sh | sh
```

```bash
# En Windows (y añadir a Path de usuario si no se hizo automáticamente)
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

* **Node.js**: [(Descarga para Windows)](https://nodejs.org/dist/v24.13.0/node-v24.13.0-x64.msi) [(Descarga para MacOS)](https://nodejs.org/dist/v24.13.0/node-v24.13.0.pkg)
* **Git**: [Instala git](https://git-scm.com/install/windows) (Para la clonación y control de versiones desde la terminal.)

---

## Preparación del proyecto (Windows)

### 1. Clonar el repositorio
Abre tu terminal y ejecuta:
```bash
https://github.com/git-oojl/autosphere-ids
cd autosphere-ids
```

### 2. Backend (Django + uv)
El backend utiliza `uv` para gestionar el entorno virtual y las dependencias de forma automática.

1.  Abre **PowerShell** desde la raiz del proyecto y navega a la carpeta:
    ```powershell
    cd backend
    ```
2.  Sincroniza el proyecto (esto crea el `.venv` e instala dependencias):
    ```powershell
    uv sync
    ```
3.  Ejecuta las migraciones de la base de datos:
    ```powershell
    uv run python manage.py migrate
    ```
4.  Inicia el servidor de desarrollo:
    ```powershell
    uv run python manage.py runserver
    ```

> [!IMPORTANT]
> **Advertencia:** Favor de **NUNCA** invocar `python` directamente en este proyecto. Usa siempre `uv run python` para asegurar que se utilice el entorno virtual correctamente.
>
> *Si necesitas activar el shell del entorno manualmente:*
> * PowerShell: `.venv\Scripts\Activate.ps1`
> * CMD / Unix: `.venv\Scripts\Activate`
>
> **Nota:** Activar el entorno virtual **no es estrictamente necesario** al usar `uv`, **ya que cualquier invocación de `uv` lo activará sigilosamente de forma automática**. Esto es para ahorrar tiempo.

### 3. Frontend (Vue.js)
1.  Desactiva el entorno virtual mediante `deactivate` (si se encuentra activado) y navega a la carpeta:
    ```powershell
    cd frontend
    ```
2.  Instala las dependencias de Node.js:
    ```bash
    npm ci
    ```
3.  Inicia el servidor de desarrollo de Vite:
    ```bash
    npm run dev
    ```

## Calidad de Código (Linting & Formatting)

Este proyecto utiliza pre-commit hooks y GitHub Actions para asegurar que el código sea consistente y funcional antes de integrarse. Al proponer un commit en la terminal, se realizarán pruebas de calidad. Si una falla, **no se permitirá el commit hasta que sea corregida.**

### Herramientas
- **Backend (Python):** Ruff (linting) y Black (formateo).
- **Frontend (Vue):** ESLint (reglas de código) y Prettier (formateo).

Para que los chequeos automáticos funcionen en tu máquina al hacer `git commit`, debes ejecutar esto una sola vez:

### 4.1. **Configurar Hooks del Backend**  
   ```powershell
   cd backend
   uv sync
   uv run pre-commit install --install-hooks
   ```

### 4.2. **Configurar Dependencias del Frontend**  
   ```powershell
   cd frontend
   npm ci
   ```

### **¿Qué hacer si falla un commit?**
Si `pre-commit` bloquea tu intento de commit, la terminal te indicará qué falló. Sigue estos pasos para arreglarlo:

#### Si falla el Frontend (Vue/JS)  
Ejecuta desde `/frontend`:

- Para errores de código (ESLint):
```bash
npm run lint:fix
```
> Nota: Algunos errores de lógica deben corregirse manualmente.

- Para errores de formato (Prettier):
```bash
npm run format
```

### Ejecución Manual (Simular CI)
Si quieres correr todas las pruebas localmente (igual que lo hace GitHub Actions), usa estos comandos:

**Backend:**
```powershell
cd backend
uv run pytest
```

**Frontend:**
```bash
cd frontend
npm run lint
npm run format:check
npm run build
```

---

## Estructura del Proyecto

* `/backend`: Lógica del servidor, API y modelos de datos (Django).
* `/frontend`: Interfaz de usuario y componentes (Vue/Vite).
* `/infra`: Despliegue
* `pyproject.toml`: Configuración de dependencias de Python gestionada por `uv`.
* `package.json`: Configuración de dependencias de JavaScript.

---