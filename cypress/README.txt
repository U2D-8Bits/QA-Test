# Instrucciones de Ejecución

1. **Requisitos Previos:**

   - Clonar el repositorio: 
   - Tener Node.js y npm instalados.
   - Tener Cypress instalado en el proyecto (si no lo está, ejecutar `npm install cypress --save-dev` en la raíz del proyecto).

2. **Abrir Cypress:**
   - Navegar a la raíz del proyecto en la terminal.
   - Ejecutar el comando: `npx cypress open`

3. **Ejecutar la Prueba:**
   - En la interfaz de Cypress, se listarán las pruebas de E2E.
   - Hacer clic en `demoblaze_purchase.cy.js` para ejecutar la prueba.

4. **Ver Reportes (si están configurados):**
   - Cypress genera videos de la ejecución por defecto en la carpeta `cypress/videos`.
   - Para reportes más detallados (como Mochawesome), se necesitaría configuración adicional en `cypress.config.js` y la instalación del reporter correspondiente.

La prueba realizará los siguientes pasos:
- Agregar dos productos al carrito
- Visualizar el carrito
- Completar el formulario de compra
- Finalizar la compra y validar el mensaje de éxito