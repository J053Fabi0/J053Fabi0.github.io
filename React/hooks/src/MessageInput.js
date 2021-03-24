import React, { useState, useRef } from "react";

function MessageInput() {
  const [message, setMessage] = useState("");
  const counter = useRef(0);

  const sendMessage = () => {
    console.log("Mensaje enviado: ", message);
    console.log(Object.keys(counter));
  };

  return (
    <div>
      <input
        type="text"
        name=""
        id=""
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}

export default MessageInput;
