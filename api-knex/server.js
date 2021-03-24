require("dotenv").config();
const express = require("express");
const { errors } = require("celebrate");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", require("./routes"));

// Cualquier error que dé Joi lo atrapará aquí.
// El órden es importante
app.use(errors());

app.listen(3000, () => console.log("Server on port 3000"));
