const ModelUser = require("../models/Users");
const hashPassword = require("../utils/hashPassword");
const authenticate = require("../utils/autenticate");
const generateJWT = require("../utils/generateJWT");

const createUser = async (req, res) => {
  // Hash the password
  if (req.body.password) req.body.password = await hashPassword(req.body.password);

  ModelUser.create(req.body)
    .then((row) => res.status(201).send(row))
    .catch((e) => res.status(400).send(e));
};

const login = async (req, res) => {
  // Verificar el password, el usuario y generar el jwt
  try {
    const { user } = await authenticate(req.body);
    const token = generateJWT(user);

    return res.status(201).send({ token });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const findAllUsers = (_, res) =>
  ModelUser.findAll()
    .then((rows) => res.status(200).send(rows))
    .catch((e) => res.status(400).send(e));

const findOneUser = (req, res) =>
  ModelUser.findOne(req.params.id_user)
    .then((r) => res.status(200).send(r))
    .catch((e) => res.status(400).send(e));

const updateOne = (req, res) =>
  ModelUser.update(req.params.id_user, req.body)
    .then((r) => res.status(200).send(r))
    .catch((e) => res.status(400).send(e));

const destroyOneUser = (req, res) =>
  ModelUser.destroy(req.params.id_user)
    .then(() => res.status(204).send())
    .catch((e) => res.status(400).send(e));

const deleteOneUser = ({ params: { id_user } }, res) =>
  ModelUser.dilit(id_user)
    .then(() => res.status(204).send())
    .catch((e) => res.status(400).send(e));

module.exports = { createUser, findAllUsers, findOneUser, updateOne, destroyOneUser, deleteOneUser, login };
