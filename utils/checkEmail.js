const Artist = require("../models/Artist");

const checkEmail = async (email) => {
  const artist = await Artist.findOne({ email });
  if (artist) {
    throw new Error("Email already in use");
  }
};

module.exports = checkEmail;
