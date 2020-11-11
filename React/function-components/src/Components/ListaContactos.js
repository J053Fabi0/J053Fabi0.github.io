import React from "react";

function ListaContactos({ lista }) {
  return (
    <div>
      <h1>Contactos</h1>
      {lista.length === 0 ? (
        <p>Cargando</p>
      ) : (
        lista.map(({ name, id }) => <h1 id={id}>{name}</h1>)
      )}
    </div>
  );
}

export default ListaContactos;
