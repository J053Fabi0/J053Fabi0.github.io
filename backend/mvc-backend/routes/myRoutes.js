const express = require("express");
const homeController = require("../contollers/homeController");
const createPetController = require("../contollers/createPetController");

const router = express.Router();

router.get("/", homeController);

router.post("/api/pets", createPetController);

module.exports = router;
