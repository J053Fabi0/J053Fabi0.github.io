import React, { useState } from "react";

function Formulario({ agregarContacto }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const onSubmitContacto = (e) => {
    e.preventDefault();
    agregarContacto(name, lastName);
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmitContacto(e)}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Nombre"
        />
        <br />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          placeholder="Apellido"
        />
        <br />
        <br />
        <button>Guardar</button>
      </form>
    </div>
  );
}

export default Formulario;
