import suma from "./suma";

// este es un unit test
describe("Probando la función suma", () => {
  it("Las sumas", () => {
    // Ejecutar mi función suma
    // const resultado = suma(5, 5);
    // expect(resultado).toBe(10);
    expect(suma(5, 5)).toBe(10);
    expect(suma("5", "5")).toBe("55");
  });
});
