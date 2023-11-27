require("dotenv").config();
const express = require("express");
const app = express();
const connect = require("./db/connect");

app.get("/", (req, res) => {
  res.send("Welcome Home");
});
// testing

const PORT = 3000;

const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`App listening at port ${PORT}`);
    });
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

start();
