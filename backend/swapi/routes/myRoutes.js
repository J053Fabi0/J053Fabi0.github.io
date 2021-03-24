const express = require("express");
const peopleController = require("../controller/peopleController");

const router = express.Router();

router.get("/api/people/:peopleID", peopleController);

module.exports = router;
