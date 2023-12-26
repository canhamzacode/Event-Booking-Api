const express = require("express");
const router = express.Router();
const { getEvent } = require("../controller/event.controller");

router.get("/events/:id", getEvent);

module.exports = router;
