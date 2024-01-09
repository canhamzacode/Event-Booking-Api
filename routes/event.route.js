const express = require("express");
const router = express.Router();
const { deleteEvent } = require("../controller/event.controller");

router.delete("/events/:id", deleteEvent);

module.exports = router;
