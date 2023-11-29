const Artist = require("../models/Artist");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const artistLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: "All fields are required" });
  }

  const findArtist = await Artist.findOne({ email });

  if (!findArtist) {
    return res.status(404).json({ message: "Incorrect credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, findArtist.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid Email or password" });
  }

  const { _id: id, name } = findArtist;
  const token = jwt.sign({ email, id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  const response = { id, name, email };

  return res.status(200).json({
    message: "Login successfully",
    token,
    data: response,
  });
};

module.exports = {
  artistLogin,
};
