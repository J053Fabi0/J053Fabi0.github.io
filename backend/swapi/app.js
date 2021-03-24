const express = require("express");
const myRoutes = require("./routes/myRoutes");

const app = express();

app.use(myRoutes);

app.listen(3000, () => console.log("Server on port 3000"));
