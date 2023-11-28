const Artist = require("../models/Artist");
const validateId = require("../utils/validateId");

const getArtist = async (req, res) => {
  const { id } = req.params;
  await validateId(id);

  const artist = await Artist.findOne({ _id: id });
  if (!artist) {
    throw new Error("Artist with this Id doesnt exist");
  }
  const { name, genre, bio } = artist;
  const response = {
    id,
    name,
    genre,
    bio,
  };
  res.status(200).json({ ...response });
};

module.exports = {
  getArtist,
};
