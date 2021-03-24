const express = require("express");
const myRoutes = require("./routes/myRoutes");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(myRoutes);

app.listen(3000, () => console.log("Server on port 3000"));
