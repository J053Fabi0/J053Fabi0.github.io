const express = require("express");

const router = express.Router();

router.use([require("./homeRoutes"), require("./userRoutes")]);

module.exports = router;
