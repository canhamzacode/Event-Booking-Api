const Artist = require("../models/Artist");
const Event = require("../models/Event");

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    const response = events.map((event) => {
      const { _id, title, date, location, description, artist } = event;

      return {
        id: _id,
        title,
        date,
        location,
        description,
        artist,
      };
    });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllEvents,
};
