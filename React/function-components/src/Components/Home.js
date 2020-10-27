import React from "react";
import Counter from "./Counter";
import ListaContactos from "./ListaContactos";
import Formulario from "./Formulario";

function Home({ saludo, cmp }) {
  return (
    <div>
      <h1>Este es mi Home</h1>
      <p>{saludo}</p>
      {cmp}
      <Counter />
      <ListaContactos />
      <Formulario />
    </div>
  );
}

export default Home;
