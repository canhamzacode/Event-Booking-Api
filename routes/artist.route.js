const express = require("express");
const router = express.Router();
const { artistLogin } = require("../controller/artist.controller");

router.post("/artists/login", artistLogin);

module.exports = router;
