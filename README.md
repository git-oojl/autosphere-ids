# autosphere-ids

Este proyecto es una aplicación full-stack que utiliza **Django** en el backend y **Vue** en el frontend. Seguimos el estándar de equipo utilizando `uv` para la gestión de dependencias de Python.

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

* **uv**: [Instalar uv](https://github.com/astral-sh/uv) (Gestor de paquetes de Python ultra rápido).
* **Node.js**: [Descargar Node.js](https://nodejs.org/dist/v24.13.0/node-v24.13.0-x64.msi)
* **Git**: [Instala git](https://git-scm.com/install/windows) (Para la clonación y control de versiones desde la terminal.)

---

## Inicio Rápido (Windows)

### 1. Clonar el repositorio
Abre tu terminal y ejecuta:
```bash
git clone https://github.com/tu-usuario/autosphere-ids.git
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
> **Regla de equipo:** Favor de NUNCA invocar `python` directamente. Usa siempre `uv run python` para asegurar que se utilice el entorno virtual correctamente.
>
> *Si necesitas activar el shell del entorno manualmente:*
> * PowerShell: `.venv\Scripts\Activate.ps1`
> * CMD: `.venv\Scripts\Activate`

### 3. Frontend (Vue.js)
1.  Desactiva el entorno virtual mediante `deactivate` (si se encuentra activado) y navega a la carpeta:
    ```powershell
    cd frontend
    ```
2.  Instala las dependencias de Node.js:
    ```bash
    npm ci
    # o bien: npm install
    ```
3.  Inicia el servidor de desarrollo de Vite:
    ```bash
    npm run dev
    ```

---

## Estructura del Proyecto

* `/backend`: Lógica del servidor, API y modelos de datos (Django).
* `/frontend`: Interfaz de usuario y componentes (Vue/Vite).
* `/infra`: Despliegue
* `pyproject.toml`: Configuración de dependencias de Python gestionada por `uv`.
* `package.json`: Configuración de dependencias de JavaScript.

---