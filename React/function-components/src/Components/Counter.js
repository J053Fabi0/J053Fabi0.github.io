import React, { useState } from "react";

function Counter() {
  // useState devuelve un arreglo con dos elementos
  // A useState le puedes parámetro el estado inicial
  const [estadoContador, setContador] = useState(0);

  return (
    <div>
      <p>{estadoContador}</p>
      <button onClick={() => setContador(estadoContador + 1)}>Sumar 1</button>
      <button onClick={() => setContador(estadoContador - 1)}>Restar 1</button>
    </div>
  );
}

export default Counter;
