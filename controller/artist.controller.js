const Artist = require("../models/Artist");
const checkEmail = require("../utils/checkEmail");
const bcrypt = require("bcrypt");

const createArtist = async (req, res) => {
  try {
    const { name, email, password, genre, bio } = req.body;

    if (!Array.isArray(genre)) {
      throw new Error("'genre' must be an array");
    }

    if (!genre.every((item) => typeof item === "string")) {
      throw new Error("All elements in 'genre' must be strings");
    }

    if (!name || !email || !password || genre.length === 0) {
      throw new Error("Fill all required fields");
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
    res.status(201).json({
      message: "Artist created Sucessfully",
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating artist",
      error: error.message,
    });
  }
};

module.exports = {
  createArtist,
};
