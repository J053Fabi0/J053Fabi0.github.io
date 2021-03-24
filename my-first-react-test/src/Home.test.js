// Este es una prueba de componente

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home";
import Search from "./Search";

describe("Prueba del componente Home", () => {
  it("Que se imprima bien", () => {
    render(<Home />);
    // screen.debug();
  });

  // Buscar un elemento dentro del DOM
  it("Render test home with Search component", () => {
    render(<Home />);
    expect(screen.getByText("Search:")).toBeInTheDocument();
  });

  // Modifica el objeto input
  it("Test para escribir en un input", () => {
    render(<Home />);
    screen.debug();
    const input = screen.getByTestId("search");

    // change -> en dónde va a escribir, lo que escribirá
    fireEvent.change(input, {
      target: {
        value: "Una búsqueda más",
      },
    });
    console.log("----------------------");
    screen.debug();
  });

  // Detectar que se detone correctamente el onChange
  it("Detectar que se detone correctamente el onChange", () => {
    const functionOnChangeFake = jest.fn();

    render(<Search value="" onChange={functionOnChangeFake} text="Este es un título" />);

    const input = screen.getByTestId("search");
    fireEvent.change(input, {
      target: { value: "JS" },
    });

    expect(functionOnChangeFake).toHaveBeenCalledTimes(1);
  });
});
