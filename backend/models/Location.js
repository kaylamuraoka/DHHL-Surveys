const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    objectId: {
      type: String,
      required: [true, "Please provide a unique object Id"],
      unique: true,
    },
    tmk: {
      type: Number,
    },
    housePrfx: {
      type: Number,
      default: "",
    },
    houseNumbr: {
      type: Number,
      default: "",
    },
    houseSuffix: {
      type: Number,
      default: "",
    },
    streetName: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    zipCode: {
      type: Number,
      default: "",
    },
    subdivision: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
