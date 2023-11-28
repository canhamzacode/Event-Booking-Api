const express = require("express");
const router = express.Router();
const { createArtist } = require("../controller/artist.controller");

router.post("/create", createArtist);

module.exports = router;
