const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adSchema = new Schema(
  {
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
    price: {
      type: Number,
      required: true,
    },
    contact_number: {
      type: String,
      required: true,
    },
    seller_id: {
      type: String,
      required: true,
    },
    seller_name: {
      type: String,
      required: true,
    },
    sold: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ad", adSchema);
