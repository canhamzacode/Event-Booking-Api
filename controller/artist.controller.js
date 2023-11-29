const jwt = require("jsonwebtoken");
const Artist = require("../models/Artist");
const bcrypt = require("bcrypt");

const updateArtist = async (req, res) => {
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
    const { id } = decoded;

    if (updateData || updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    const artist = await Artist.findOne({ _id: id });

    if (updateData || updateData.email) {
      await checkUniquenessBeforeUpdate(updateData.email, artist.email);
    }

    const updatedArtist = await Artist.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    const { name, _id } = updatedArtist;

    const response = {
      name,
      id: _id,
    };

    return res
      .status(200)
      .json({ message: "Artist updated sucessfully", data: response });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token has expired" });
    }
    console.log(error);
  }
};

module.exports = {
  updateArtist,
};
