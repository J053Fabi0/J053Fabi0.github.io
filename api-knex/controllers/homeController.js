const ModelHome = require("../models/Homes");

const createHome = (req, res) =>
  ModelHome.create(req.body)
    .then((row) => res.status(201).send(row))
    .catch((e) => res.status(400).send(e));

const findAllHomes = (_, res) =>
  ModelHome.findAll()
    .then((rows) => res.status(200).send(rows))
    .catch((e) => res.status(400).send(e));

const findOneHomes = (req, res) =>
  ModelHome.findOneWithUser(req.params.idHome)
    .then((r) => res.status(200).send(r))
    .catch((e) => res.status(400).send(e));

const updateOne = (req, res) =>
  ModelHome.update(req.params.idHome, req.body)
    .then((r) => res.status(200).send(r))
    .catch((e) => res.status(400).send(e));

const destroyOneHome = (req, res) =>
  ModelHome.destroy(req.params.idHome)
    .then(() => res.status(204).send())
    .catch((e) => res.status(400).send(e));

const deleteOneHome = ({ params: { idHome } }, res) =>
  ModelHome.dilit(idHome)
    .then(() => res.status(204).send())
    .catch((e) => res.status(400).send(e));

module.exports = { createHome, findAllHomes, findOneHomes, updateOne, destroyOneHome, deleteOneHome };
