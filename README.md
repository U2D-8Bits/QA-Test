# QA-TEST

Este repositorio contiene dos proyectos independientes para pruebas automatizadas sobre la plataforma DemoBlaze:

- **api/**: Pruebas automatizadas de API (signup y login) usando Cypress.
- **cypress/**: Pruebas E2E de la interfaz web usando Cypress.

## Requisitos Generales

- Node.js y npm instalados ([descargar aquí](https://nodejs.org/)).
- Windows PowerShell o terminal compatible.

---

## Instalación y Ejecución

### 1. Pruebas de API (`api/`)

```powershell
cd api
npm install
```

#### Ejecutar pruebas:
- **Modo interactivo:**
  ```powershell
  npx cypress open
  ```
- **Modo headless:**
  ```powershell
  npx cypress run
  ```

Más detalles en `api/readme.txt`.

---

### 2. Pruebas E2E Web (`cypress/`)

```powershell
cd cypress
npm install
```

#### Ejecutar pruebas:
- **Modo interactivo:**
  ```powershell
  npx cypress open
  ```
- **Modo headless:**
  ```powershell
  npx cypress run
  ```

Más detalles en `cypress/README.txt`.

---

## Estructura del Repositorio

```
qa-test/
│  README.md         # (este archivo)
├─ api/              # Pruebas de API
├─ cypress/          # Pruebas E2E web
```

Cada subcarpeta contiene su propio archivo de instrucciones y dependencias.

---

## Notas
- Ambas carpetas usan Cypress, pero tienen dependencias y configuraciones independientes.
- Consulta los archivos `conclusiones.txt` en cada carpeta para hallazgos y recomendaciones.
