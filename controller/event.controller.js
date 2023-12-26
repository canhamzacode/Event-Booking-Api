const validateId = require("../utils/validateId");
const Event = require("../models/Event");
const Artist = require("../models/Artist");

const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await validateId(id);

    const event = await Event.findOne({ _id: id });
    if (!event) {
      return res
        .status(404)
        .json({ message: "Event with this Id doesnt exist" });
    }
    const { _id, title, artist, location, date, description } = event;

    const author = await Artist.findOne({ _id: artist });

    res.status(200).json({
      id: _id,
      title,
      location,
      date,
      author: { id: artist, name: author.name },
      description,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getEvent,
};
