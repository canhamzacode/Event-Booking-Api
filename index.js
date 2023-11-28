require("dotenv").config();
const express = require("express");
const app = express();
const connect = require("./db/connect");
const {
  ErrorHandlerMiddleware,
  NotFoundMiddleware,
} = require("./middlewares/");

app.get("/", (req, res) => {
  res.send("Welcome Home");
});

app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

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
