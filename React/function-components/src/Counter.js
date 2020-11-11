import React, { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [countTwo, setCountTwo] = useState(0);

  useEffect(() => {
    console.log("El valor actual es: ", countTwo);
  }, [countTwo]);

  return (
    <div>
      <h1>El valor actual es: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Aumentar</button>
      <h1>El valor actual es: {countTwo}</h1>
      <button onClick={() => setCountTwo(countTwo + 1)}>Aumentar</button>
    </div>
  );
}

export default Counter;
