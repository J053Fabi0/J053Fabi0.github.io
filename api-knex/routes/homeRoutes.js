const express = require("express");

const BASE_PATH = "/home";

const router = express.Router();

const {
  createHome,
  findAllHomes,
  findOneHomes,
  updateOne,
  destroyOneHome,
  deleteOneHome,
} = require("../controllers/homeController");

router.post(BASE_PATH, createHome);
router.get(BASE_PATH, findAllHomes);
router.get(BASE_PATH + "/:idHome", findOneHomes);
router.patch(BASE_PATH + "/:idHome", updateOne);
router.delete(BASE_PATH + "/destroy/:idHome", destroyOneHome);
router.delete(BASE_PATH + "/delete/:idHome", deleteOneHome);

module.exports = router;
