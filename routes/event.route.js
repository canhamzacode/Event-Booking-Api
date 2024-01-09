const express = require("express");
const router = express.Router();
const { updateEvent } = require("../controller/event.controller");

router.patch("/events/:id", updateEvent);

module.exports = router;
