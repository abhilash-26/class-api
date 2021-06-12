const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    // I stands for instructor and S represents student
    enum: ["I", "S"],
    default: "S",
    require: true,
  },
});

module.exports = mongoose.model("userSchema", schema, "userSchema");
