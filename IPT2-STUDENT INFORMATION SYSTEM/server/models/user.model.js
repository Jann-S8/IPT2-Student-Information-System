const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  IDnumber: String,
  Firstname: String,
  Lastname: String,
  Middlename: String,
  Username: String,
  Password: String,
  Usertype: String,
});

module.exports = mongoose.model("User", userSchema);
