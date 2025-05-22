Instrucciones para la Ejecución de las Pruebas de API con Cypress

Este proyecto contiene pruebas automatizadas para los servicios de API de signup y login de Demoblaze (https://www.demoblaze.com/).

Requisitos Previos:
1. Node.js y npm instalados: Asegúrate de tener Node.js (que incluye npm) instalado en tu sistema. Puedes descargarlo desde https://nodejs.org/.
2. Cypress instalado: Si no tienes Cypress instalado en el proyecto, puedes hacerlo localmente.
3. Clonar repositorio: 

Pasos para la Configuración y Ejecución:

1. Clonar el Repositorio (si aplica):
   Si has clonado este proyecto desde un repositorio Git, navega a la carpeta raíz del proyecto en tu terminal.
   Si solo tienes los archivos, asegúrate de que estén en una estructura de proyecto adecuada (con `package.json`, `cypress.config.js`, y la carpeta `cypress`).

2. Instalar Dependencias:
   Abre una terminal en la carpeta raíz del proyecto (donde se encuentra el archivo `package.json`) y ejecuta el siguiente comando para instalar Cypress y cualquier otra dependencia definida:
   ```bash
   npm install
   ```
   Esto instalará Cypress como una dependencia de desarrollo si aún no está presente.

3. Ejecutar las Pruebas de Cypress:
   Hay dos formas principales de ejecutar las pruebas de Cypress:

   a) Modo Interactivo (Cypress Test Runner):
      Este modo es útil para ver las pruebas ejecutarse en tiempo real y para depurar.
      Ejecuta el siguiente comando en la terminal:
      ```bash
      npx cypress open
      ```
      Esto abrirá el Cypress Test Runner. Desde allí, selecciona "E2E Testing" y luego haz clic en el archivo de especificación `spec.cy.js` (o el nombre que tenga tu archivo de prueba principal) para ejecutar las pruebas.

   b) Modo Headless (Línea de Comandos):
      Este modo ejecuta las pruebas sin abrir una interfaz gráfica y es ideal para la integración continua o para obtener reportes rápidos.
      Ejecuta el siguiente comando en la terminal:
      ```bash
      npx cypress run
      ```
      Por defecto, las pruebas se ejecutarán en el navegador Electron. Si deseas especificar un navegador diferente (por ejemplo, Chrome), puedes hacerlo con la opción `--browser`:
      ```bash
      npx cypress run --browser chrome
      ```

4. Ver los Resultados y Reportes:
   - En el modo interactivo, los resultados se muestran directamente en el Test Runner.
   - En el modo headless, los resultados se mostrarán en la consola. Cypress también genera videos de la ejecución de las pruebas (por defecto en `cypress/videos/`) y capturas de pantalla en caso de fallos (en `cypress/screenshots/`).
   - Los logs de las solicitudes y respuestas de la API se pueden ver en la consola del Cypress Test Runner (si se ejecutan en modo interactivo) o en la salida de la terminal (si se ejecutan en modo headless), gracias a los comandos `cy.log()` utilizados en las pruebas.

Estructura del Proyecto Esperada:
- `package.json`: Define las dependencias del proyecto, incluyendo Cypress.
- `cypress.config.js`: Archivo de configuración de Cypress.
- `cypress/`
  - `e2e/`
    - `spec.cy.js`: Contiene los scripts de prueba para los servicios de API.
  - `fixtures/`: Puede contener datos de prueba (no se usa extensivamente en este ejercicio de API).
  - `support/`: Contiene comandos personalizados y configuraciones globales de Cypress.

Notas Adicionales:
- Las pruebas generan un usuario con un nombre y contraseña únicos basados en el timestamp actual para cada ejecución, con el fin de evitar conflictos con usuarios existentes durante el registro.
- Las pruebas verifican los siguientes escenarios:
  - Registro de un nuevo usuario.
  - Intento de registro de un usuario ya existente.
  - Inicio de sesión con credenciales correctas.
  - Intento de inicio de sesión con un usuario incorrecto.
  - Intento de inicio de sesión con una contraseña incorrecta.
