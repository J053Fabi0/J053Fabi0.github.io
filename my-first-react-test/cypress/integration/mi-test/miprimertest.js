// Recibe dos parámetros: test name, callback

const c = cy;
describe("Página principal de react app.", () => {
  // Aquí van las cosas a testear.
  const visit = () => c.visit("https://www.electronjs.org/");

  // Que se va a probar un callback
  it("Que exista un texto", () => {
    visit();
    c.get("#parrafo").contains("Aquí está un párrafo para");
    // c.get(".App-link").contains("Hola");
  });

  it("Que exista un formulario en la página principal.", () => {
    visit();
    c.get("#user").type("usuario");
    c.get("#password").type("123");
    c.get("#onLogin").click();
  });

  it("No se escribe la contraseña", () => {
    visit();
    c.get("#user").type("usuario");
    c.get("#onLogin").click();
  });
});
