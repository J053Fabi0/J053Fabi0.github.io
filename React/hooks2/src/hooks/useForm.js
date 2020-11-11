import { useState, useEffect } from "react";

function useForm(cb, defaults) {
  const [inputs, setInputs] = useState(defaults);

  // useEffect escucha cambios en los props o en el estado
  useEffect(() => setInputs({ ...defaults }), [defaults]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
    cb?.(inputs);
  };

  return {
    inputs,
    handleInputChange,
  };
}

export default useForm;
