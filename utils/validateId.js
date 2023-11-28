const mongoose = require("mongoose");
const validateId = async (id) => {
  if (!id) {
    throw new Error("Id must Be Provided");
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }
};

module.exports = validateId;
