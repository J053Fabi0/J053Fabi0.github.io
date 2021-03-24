const express = require("express");

const BASE_PATH = "/user";

const router = express.Router();

const verify = require("../middelwares/verify");
const checkRol = require("../middelwares/checkRol");

const {
  createUser,
  findAllUsers,
  findOneUser,
  updateOne,
  destroyOneUser,
  deleteOneUser,
  login,
} = require("../controllers/userController");
const { createUserValidator } = require("../validators/userValidator");

router.post(BASE_PATH, [createUserValidator], createUser);
router.get(BASE_PATH, [verify, checkRol("admin")], findAllUsers);
router.post(BASE_PATH + "/login", login);
router.get(BASE_PATH + "/:id_user", [verify, checkRol("guest")], findOneUser);
router.patch(BASE_PATH + "/:id_user", updateOne);
router.delete(BASE_PATH + "/delete/:id_user", deleteOneUser);
router.delete(BASE_PATH + "/destroy/:id_user", destroyOneUser);

module.exports = router;
