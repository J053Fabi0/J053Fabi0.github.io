import React, { useState } from "react";

function ListaContactos() {
  const [contactos, setContactos] = useState([
    { id: 1, name: "Mario", lastName: "Mario" },
    { id: 2, name: "Luigi", lastName: "Mario" },
  ]);
  return (
    <div>
      <h1>Contactos</h1>
      {contactos.map(({ name, id }) => (
        <h1 id={id}>{name}</h1>
      ))}
    </div>
  );
}

export default ListaContactos;
