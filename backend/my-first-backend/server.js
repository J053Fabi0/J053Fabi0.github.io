// Las configuraciones de mi server van aquí

const express = require("express");

// Crea una instacia de express y la llama "app"
const app = express();

// Levanta el servidor en un puerto y recibe un callback
app.listen(3000, () => console.log("Server on port 3000"));
