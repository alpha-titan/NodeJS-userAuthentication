const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },

  firstName: {
    type: String,
    required: true,
    max: 255,
  },
  lastName: {
    type: String,
    required: true,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 296,
    min: 6,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    max: 1240,
    min: 7,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", userSchema);
