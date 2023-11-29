const express = require("express");
const router = express.Router();
const { getArtist } = require("../controller/artist.controller");

router.get("/artists/:id", getArtist);

module.exports = router;
