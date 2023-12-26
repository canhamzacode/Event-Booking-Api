const express = require("express");
const router = express.Router();
const { currentArtist } = require("../controller/artist.controller");

router.get("/artists/me", currentArtist);

module.exports = router;
