import React, { useState } from "react";

function Formulario() {
  return (
    <div>
      <form onSubmit={() => console.log("hola")}>
        <input required placeholder="Nombre" />
        <br />
        <input required placeholder="Apellido" />
        <br />
        <br />
        <button>Guardar</button>
      </form>
    </div>
  );
}

export default Formulario;
