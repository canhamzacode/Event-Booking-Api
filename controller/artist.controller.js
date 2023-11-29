const Artist = require("../models/Artist");
const checkEmail = require("../utils/checkEmail");
const bcrypt = require("bcrypt");

const createArtist = async (req, res) => {
  try {
    const { name, email, password, genre, bio } = req.body;

    if (!Array.isArray(genre)) {
      return res.status(401).json({ message: "'genre' must be an array" });
    }

    if (!genre.every((item) => typeof item === "string")) {
      return res
        .status(401)
        .json({ message: "All elements in 'genre' must be strings" });
    }

    if (!name || !email || !password || genre.length === 0) {
      return res.status(401).json({ message: "All fields are required" });
    }

    await checkEmail(email);
    const newPassKey = await bcrypt.hash(password, 10);
    console.log(newPassKey);
    const newArtist = await Artist.create({
      name,
      email,
      password: newPassKey,
      genre,
      bio,
    });
    const { _id: id } = newArtist;
    const response = {
      id,
      name,
    };
    return res.status(201).json({
      message: "Artist created Sucessfully",
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error creating artist",
      error: error.message,
    });
  }
};

module.exports = {
  createArtist,
};
