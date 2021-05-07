const mongoose = require("mongoose");

const SesionCliente = require("./SesionCliente");

const MONGO_URI =
  "mongodb+srv://josefabio:SFjpVqPBlVQ8yOHPSNg6Zu3TpKgtP6iCBjFVeTxB0uu9geoTC@cluster0.nxpoi.mongodb.net/dataklustera?retryWrites=true&w=majority";
mongoose.connect(MONGO_URI, { useNewUrlParser: true });

module.exports = {
  SesionCliente,
};
