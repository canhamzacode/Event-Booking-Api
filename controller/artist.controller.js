const Artist = require("../models/Artist");

const getAllArtists = async (req, res) => {
  const artists = await Artist.find({});

  const response = artists.map((artist) => {
    const { _id, name, genre, bio } = artist;
    return {
      id: _id,
      name,
      genre,
      bio,
    };
  });
  res.status(200).json({ data: response });
};

module.exports = {
  getAllArtists,
};
