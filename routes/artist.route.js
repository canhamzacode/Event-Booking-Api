const express = require("express");
const router = express.Router();
const { createArtist } = require("../controller/artist.controller");

router.post("/artists", createArtist);

module.exports = router;
