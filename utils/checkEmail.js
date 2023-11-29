const Artist = require("../models/Artist");

const checkUniquenessBeforeUpdate = async (email, currentEmail) => {
  const artist = await Artist.findOne({ email });

  if (artist && artist.email !== currentEmail) {
    return res.status(401).json({ message: "Email already in use" });
  }
};

module.exports = {
  checkUniquenessBeforeUpdate,
};
