import React, { useEffect, useState } from "react";
import "./App.scss";
import useForm from "./hook/useForm";

function App() {
  const [datos, setDatos] = useState({});

  useEffect(() => {
    setTimeout(() => {
      const info = {
        nombre: "Juan",
        apellidos: "Duas",
        edad: 27,
        genero: "H",
        email: "hola@tuta.io",
        password: "comida",
      };
      setDatos(info);
    }, 1000);
  }, []);

  const sendData = (data) => {
    console.log(data);
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(sendData, datos);

  return (
    <div className="App" onSubmit={handleSubmit}>
      <form action="">
        <input
          type="text"
          name="nombre"
          onChange={handleInputChange}
          value={inputs.nombre}
          placeholder="tu nombre"
        />
        <input
          type="text"
          name="apellidos"
          onChange={handleInputChange}
          value={inputs.apellidos}
          placeholder="tus apellidos"
        />
        <input
          type="email"
          name="email"
          onChange={handleInputChange}
          value={inputs.email}
          placeholder="tu email"
        />
        <input
          type="password"
          name="password"
          onChange={handleInputChange}
          value={inputs.password}
          placeholder="tu password"
        />
        <select
          name="genero"
          onChange={handleInputChange}
          value={inputs.genero}
        >
          <option value="">Elige un genero</option>
          <option value="M">Mujer</option>
          <option value="H">Hombre</option>
        </select>
        <input
          type="number"
          name="edad"
          onChange={handleInputChange}
          value={inputs.edad}
          placeholder="tu edad"
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
