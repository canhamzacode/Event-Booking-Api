const jwt = require("jsonwebtoken");
const Event = require("../models/Event");

const createEvent = async (req, res) => {
  try {
    const { authorization } = req.headers;

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

    const { id } = decoded;

    const { title, location, date, description } = req.body;
    if (!title || !location || !date || !description) {
      return res.status(401).json({ message: "All fields are required" });
    }

    const event = Event.create({
      title,
      artist: id,
      location,
      date,
      description,
    });

    const { id: eventId } = event;

    return res.status(201).json({
      message: "Event created successfully",
      data: { id: eventId, title, location, date },
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error creating artist",
      error: error.message,
    });
  }
};

module.exports = { createEvent };
