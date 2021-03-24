const express = require("express");

const routes = express.Router();

// Configurar para que se pueda recibir body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Crear nuestro primer endpoint (GET)
app.get("/", (req, res) => {
  res.send({
    id: 1,
    text: "Caca",
  });
});

app.get("/api/pets/:miID", (req, res) => {
  // Se me ocurrió que con este método se puede obtener el miID
  // y también la ruta de arriba puede ser un regex
  let url = req.url.split("/");
  url = Number(url[url.length - 1]);

  if (url > 99) return res.status(404).send({ mensaje: "No exite" });

  // pero para obtener el miID de la mejor forma es así:
  const idPet = req.params.miID;
  res.send({
    id: `El id que buscas es: ${idPet}`,
  });
});

// http://localhost:3000/api/pets?color=blanco
app.get("/api/pets", (req, res) => {
  // req.query tiene un objeto con los querys
  res.send(req.query);
});

app.get("/api/suma", ({ query }, res) => {
  if (!query.num1 || !query.num2)
    return res.status(666).send({ mensaje: "Missing query params num1 and/or num2" });

  const { num1, num2 } = query;
  res.send({ suma: Number(num1) + Number(num2) });
});

// Post se comporta igual que los otros métodos
app.post("/api/pets", (req, res) => {
  //Obtener el body
  res.status(201).send(req.body);
});

app.post("/api/suma", ({ body }, res) => {
  if (!body.num1 || !body.num2) return res.status(666).send({ mensaje: "Missing body params num1 and/or num2" });

  const { num1, num2 } = body;
  res.send({ suma: Number(num1) + Number(num2) });
});

app.put("/api/same", ({ body }, res) => res.send(body));

app.delete("/api/delete/:id", ({ params }, res) => {
  if (params.id !== "3") res.sendStatus(404);
  else res.sendStatus(200);
});
