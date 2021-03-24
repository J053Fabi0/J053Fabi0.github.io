import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import useForm from "./hooks/useForm";

function App() {
  const [data, setDatos] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/employees")
      .then((data) => {
        console.log(data.data);
        setDatos(data.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const sendData = (data) => {
    axios.patch();
  };

  const { inputs, handleInputChange } = useForm(sendData, data);

  return (
    <div className="App">
      <form action="">
        <input
          type="text"
          name="first_name"
          onChange={handleInputChange}
          value={inputs.first_name}
          placeholder="Nombre"
        />
        <input
          type="text"
          name="last_name"
          onChange={handleInputChange}
          value={inputs.last_name}
          placeholder="Apellido"
        />
        <input
          type="email"
          name="email"
          onChange={handleInputChange}
          value={inputs.email}
          placeholder="Email"
        />
        <input
          type="number"
          name="salary"
          onChange={handleInputChange}
          value={inputs.salary}
          placeholder="Número"
        />
        <input
          type="number"
          name="days"
          onChange={handleInputChange}
          value={inputs.days}
          placeholder="Días"
        />
      </form>
    </div>
  );
}

export default App;
