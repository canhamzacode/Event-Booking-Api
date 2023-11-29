const express = require("express");
const router = express.Router();
const { updateArtist } = require("../controller/artist.controller");

router.patch("/artists", updateArtist);

module.exports = router;
