const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const plantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  farming_method: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Plant", plantSchema);
