const { MongoClient } = require("mongodb");

let state = {
  db: null,
}; // Aquí vamos a guardar el estado de la conexión

exports.connect = function (url, done) {
  // url es la url de conexión
  // y done es el callback que ejecutará algo si todo sale bien

  if (state.db) return done(); // Si ya hay una conexión activa
  MongoClient.connect(url, function (err, db) {
    if (err) return done(err);
    state.db = db; // guardo el estado de la conexión en el state
    done(); // Ejecuto algo
  });
};

exports.get = () => state.db;

exports.close = function (done) {
  if (state.db)
    state.db.close(function (err, res) {
      state.db = null; // Al terminar la conexión, borro el estado que tenía antes
      done(); // Ejecuto algo
    });
};
