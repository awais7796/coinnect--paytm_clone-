const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLenght: 6,
    maxLenght: 8,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minLenght: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLenght: 6,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLenght: 6,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = {
  User,
};
