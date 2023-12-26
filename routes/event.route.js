const express = require("express");
const router = express.Router();
const { createEvent } = require("../controller/event.controller");

router.post("/events/", createEvent);

module.exports = router;
