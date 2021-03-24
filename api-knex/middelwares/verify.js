const JWT = require("jsonwebtoken");
const UserModel = require("../models/Users");
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = async (req, res, next) => {
  const Authorization = req.get("Authorization");

  try {
    if (!Authorization) return res.status(404).send({ message: "Header no se envió." });

    const token = Authorization.replace("JWT ", "");
    // Verificar que lo que envían es de nuestro backend.
    const payload = JWT.verify(token, SECRET_KEY);

    if (!payload) return res.status(404).send({ message: "Token inválido" });

    const { id_user } = payload;

    const user = await UserModel.find({ id_user }).catch(() =>
      res.status(400).send({ message: "No se pudo realizar la acción." })
    );

    if (!user) return res.status(404).send({ message: "Usuario no encontrado" });

    // Inicando la sesión en el backend, esto lo puedo ocupar o en otros middlewares o en el controller
    req.user = user[0];
    next();
  } catch (err) {
    res.status(400).send(err);
  }
};
