const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  instructorId: {
    type: mongoose.Types.ObjectId,
    ref: "userSchema",
    require: true,
  },
  instructorName: String,
  courseCharge: Number,
  courseDuration: String,
  studentsEnrolled: [
    { type: mongoose.Types.ObjectId, ref: "userSchema", require: true },
  ],
});
module.exports = mongoose.model("courseSchema", schema, "courseSchema");
