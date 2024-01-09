const jwt = require("jsonwebtoken");
const Event = require("../models/Event");

const updateEvent = (req, res) => {
  try {
    const { authorization } = req.headers;
    const updateData = req.body;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Token is missing or in an invalid format" });
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const { id: userId } = decoded;
    const { id: eventId } = req.param;

    const events = Event.find({ artist: userId });
    if (!events) {
      return res
        .status(401)
        .json({ message: "Event Cant be updated by this user" });
    }

    const filterEvent = events.filter((a) => a.id === eventId);
    if (!filterEvent) {
      return res
        .status(401)
        .json({ message: "Event Cant be updated by this user" });
    }

    const updateEvent = Event.updateOne(eventId, updateData);
    res.status(201).json({
      message: "Event updated successfully",
      data: updateEvent,
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token has expired" });
    }
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  updateEvent,
};
