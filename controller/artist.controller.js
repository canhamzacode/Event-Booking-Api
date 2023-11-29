const jwt = require("jsonwebtoken");
const Artist = require("../models/Artist");

const currentArtist = async (req, res) => {
  try {
    const { authorization } = req.headers;

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

    const artist = await Artist.findOne({ _id: id });

    const { genre, name, bio } = artist;
    const response = {
      id,
      genre,
      name,
      bio,
    };

    return res.status(200).json({ data: response });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError("Token has expired");
    }
    console.log(error);
  }
};

module.exports = {
  currentArtist,
};
