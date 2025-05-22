describe('Pruebas de API para Demoblaze', () => {
  let username;
  let password;
  const baseUrl = 'https://api.demoblaze.com';

  before(() => {
    //? Generar un nombre de usuario y contraseña aleatorios para las pruebas
    //* Se utiliza un timestamp para aumentar la probabilidad de unicidad.
    const timestamp = new Date().getTime();
    username = `testuser${timestamp}`;
    password = `password${timestamp}`; 
    cy.log(`Usuario de prueba generado: ${username}, Contraseña: ${password}`);
  });

  describe('Servicio de Registro (Signup)', () => {
    it('Debería crear un nuevo usuario exitosamente', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/signup`,
        body: {
          username: username,
          password: password,
        },
      }).then((response) => {
        cy.log('Respuesta Signup (nuevo usuario):', JSON.stringify(response.body));
        expect(response.status).to.eq(200);
        //* Una respuesta exitosa de signup en Demoblaze usualmente es un string vacío
        //* o a veces un objeto vacío {}. Si hay un error, devuelve {"errorMessage": "...}
        //* Para este caso, esperamos que no haya errorMessage.
        if (typeof response.body === 'object' && response.body !== null && Object.keys(response.body).length > 0) {
          expect(response.body.errorMessage).to.be.undefined;
        } else {
          //* Permite string vacío o un objeto JSON vacío como respuesta válida
          expect(response.body === '' || (typeof response.body === 'object' && Object.keys(response.body).length === 0)).to.be.true;
        }
      });
    });

    it('No debería permitir crear un usuario ya existente', () => {
      //? Este test depende de que el usuario haya sido creado en la prueba anterior.
      //* Se intenta registrar el mismo usuario nuevamente.
      cy.request({
        method: 'POST',
        url: `${baseUrl}/signup`,
        body: {
          username: username,
          password: password,
        },
        failOnStatusCode: false,
      }).then((response) => {
        cy.log('Respuesta Signup (usuario existente):', JSON.stringify(response.body));
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('object');
        expect([
          'User already exist.',
          'This user already exist.'
        ]).to.include(response.body.errorMessage);
      });
    });
  });

  describe('Servicio de Inicio de Sesión (Login)', () => {
    it('Debería iniciar sesión con un usuario y contraseña correctos', () => {
      //? Este test depende de que el usuario haya sido creado previamente.
      cy.request({
        method: 'POST',
        url: `${baseUrl}/login`,
        body: {
          username: username,
          password: password,
        },
      }).then((response) => {
        cy.log('Respuesta Login (credenciales correctas):', JSON.stringify(response.body));
        expect(response.status).to.eq(200);
        // Permitir ambos formatos de respuesta: objeto o string
        if (typeof response.body === 'object' && response.body !== null) {
          expect(response.body.Auth_token).to.exist.and.not.be.empty;
        } else if (typeof response.body === 'string') {
          expect(response.body).to.include('Auth_token:');
        } else {
          throw new Error('Formato de respuesta inesperado en login exitoso');
        }
      });
    });

    it('No debería iniciar sesión con un usuario incorrecto (no existente)', () => {
      const nonExistentUser = `nouser${new Date().getTime()}`;
      cy.request({
        method: 'POST',
        url: `${baseUrl}/login`,
        body: {
          username: nonExistentUser,
          password: 'anypassword',
        },
        failOnStatusCode: false,
      }).then((response) => {
        cy.log('Respuesta Login (usuario incorrecto):', JSON.stringify(response.body));
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('object');
        expect(response.body.errorMessage).to.eq('User does not exist.');
      });
    });

    it('No debería iniciar sesión con un usuario correcto y contraseña incorrecta', () => {
      //? Este test depende de que el usuario haya sido creado previamente.
      cy.request({
        method: 'POST',
        url: `${baseUrl}/login`,
        body: {
          username: username,
          password: `wrong${password}`,
        },
        failOnStatusCode: false,
      }).then((response) => {
        cy.log('Respuesta Login (contraseña incorrecta):', JSON.stringify(response.body));
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('object');
        expect(response.body.errorMessage).to.eq('Wrong password.');
      });
    });
  });
});