const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome Home");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
