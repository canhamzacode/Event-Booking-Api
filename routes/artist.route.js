const express = require("express");
const router = express.Router();
const { deleteArtist } = require("../controller/artist.controller");

router.delete("/artists", deleteArtist);

module.exports = router;
