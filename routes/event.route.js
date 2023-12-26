const express = require("express");
const router = express.Router();
const { getAllEvents } = require("../controller/event.controller");

router.get("/events/", getAllEvents);

module.exports = router;
