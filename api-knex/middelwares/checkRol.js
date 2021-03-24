module.exports = (rol) => (req, res, next) => {
  if (rol === req.user.rol) next();
  else res.status(403).send({ message: "No tienes permiso para esto" });
};
