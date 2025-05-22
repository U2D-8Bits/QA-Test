describe('Flujo de compra en DemoBlaze', () => {

    it('Agregar dos pproductos, visualizar carrito, completar compra y finalizar', () =>{

        //? 1. Abrir página actual
        cy.visit('https://www.demoblaze.com/')


        //? 2. Agregar primer producto (ejemplo: Samsung galaxy s6)
        cy.contains('Samsung galaxy s6').click()
        cy.contains('Add to cart').click()
        cy.on('window:alert', (str) =>{
            expect(str).to.contains('Product added')
          })
          //* Esperar para que la alerta se procese
          cy.wait(1000); 
        


        //? 3. Volver a la página principal para seleccionar el segundo producto
        cy.visit('https://www.demoblaze.com/')
        //* Seleccionar el segundo producto
        cy.contains('Nokia lumia 1520').click() 
        cy.contains('Add to cart').click();
        
        //? 4. Re-configurar el listener para la segunda alerta
        cy.on('window:alert', (str) =>{ 
            expect(str).to.contains('Product added')
        });
        
        //* Esperar para que la alerta se procese
        cy.wait(1000); 

        //? 5. Ir al carrito
        cy.get('#cartur').click();
        
        //? 6. Verificar que los productos están en el carrito
        
        //* Esperar a que la tabla del carrito cargue
        cy.get('#tbodyid', { timeout: 10000 }).should('be.visible'); 
        cy.get('#tbodyid tr.success').should('have.length', 2);

        //? 7. Completar compra
        cy.contains('button', 'Place Order').click();
        cy.get('#orderModalLabel', { timeout: 5000 }).should('be.visible'); // Esperar a que el modal de compra sea visible

        //? 8. Llenar formulario de compra
        cy.get('#name').type('Pablo Bolaños Test'); // ID corregido
        cy.get('#country').type('Ecuador');
        cy.get('#city').type('Riobamba');
        cy.get('#card').type('1234567890123456'); // Escribir número de tarjeta sin espacios
        cy.get('#month').type('05');
        cy.get('#year').type('2025');

        //? 9. Confirmar compra
        cy.contains('button', 'Purchase').click();

        //? 10. Verificar mensaje de compra exitosa
        cy.get('.sweet-alert h2', { timeout: 5000 }).should('contain.text', 'Thank you for your purchase!');
        cy.get('.sweet-alert').should('be.visible');

        //? 11. Hacer clic en OK en el sweet alert
        cy.get('.confirm').click(); 
    })
})