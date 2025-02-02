// models/Logs.js
const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      default: "Anonymous", // Default value if no username is found
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Log = mongoose.model("Logs", logSchema);
module.exports = Log;