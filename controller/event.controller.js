const Artist = require("../models/Artist");
const Event = require("../models/Event");

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    const response = await Promise.all(
      events.map(async (event) => {
        const { _id, title, date, location, description, artist } = event;
        const myArtist = await Artist.findOne({ _id: artist });

        if (!myArtist) {
          return null;
        }

        const { name } = myArtist;
        const data = {
          id: _id,
          title,
          date,
          location,
          description,
          artist: { id: artist, name },
        };
        return data;
      })
    );

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllEvents,
};
