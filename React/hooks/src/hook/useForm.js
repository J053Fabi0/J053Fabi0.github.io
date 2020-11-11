// 1. Siempre llamarlo use<lo que sea>, como useForm
// 2. Siempre deben ser funciones
// 3. Tienes que utilizar hooks de react, y no debe estar en loops, condiciones o funciones anidadas
// Tienen que ser universales, que sea fácil que sea ocupado por cualquier proyecto

import { useState, useEffect } from "react";

function useForm(cb, defaults) {
  const [inputs, setInputs] = useState(defaults);

  // useEffect escucha cambios en los props o en el estado
  useEffect(() => setInputs({ ...defaults }), [defaults]);

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita el refresh al enviar form
    cb?.(inputs);
  };

  const handleInputChange = () => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  return {
    inputs,
    handleInputChange,
    handleSubmit,
  };
}

export default useForm;
