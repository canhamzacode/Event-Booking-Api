const express = require("express");
const router = express.Router();
const { getAllArtists } = require("../controller/artist.controller");

router.get("/artists", getAllArtists);

module.exports = router;
