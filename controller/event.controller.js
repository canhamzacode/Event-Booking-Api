const jwt = require("jsonwebtoken");
const Event = require("../models/Event");

const updateEvent = async (req, res) => {
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
    const { id: eventId } = req.params;

    const event = await Event.findOne({ artist: userId, _id: eventId });

    if (!event) {
      return res
        .status(401)
        .json({
          message: "Event can't be updated by this user or doesnt exist",
        });
    }

    const updateEvent = await Event.findByIdAndUpdate(eventId, updateData);
    const response = {
      id: updateEvent._id,
      title: updateEvent.title,
      location: updateEvent.location,
      time: updateEvent.title,
    };

    return res.status(201).json({
      message: "Event updated successfully",
      data: response,
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
