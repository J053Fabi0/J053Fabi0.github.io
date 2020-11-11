import React, { useEffect, useState } from "react";
import Counter from "./Counter";
import ListaContactos from "./ListaContactos";
import Formulario from "./Formulario";

function Home({ saludo, cmp }) {
  const [contactos, setContactos] = useState([]);

  const addContacto = (nombre, apellido) => {
    contactos.push({ id: contactos.length, name: nombre, lastName: apellido });
    setContactos([...contactos]);
  };

  useEffect(() => {
    setTimeout(() => setContactos([{ id: 1, name: "Ba" }]), 2000);
  }, []);

  return (
    <div>
      <h1>Este es mi Home</h1>
      <p>{saludo}</p>
      {cmp}
      <Counter />
      <ListaContactos lista={contactos} />
      <Formulario agregarContacto={addContacto} />
    </div>
  );
}

export default Home;
