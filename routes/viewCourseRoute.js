const express = require("express");
const courseSchema = require("../models/classModel");
const userSchema = require("../models/userModel");
const router = express.Router();

router.post("/student/view-course", async (req, res) => {
  try {
    let courses = [];

    const { userId } = req.body;
    const result = await courseSchema.find({
      studentsEnrolled: userId,
    });

    courses = result.map((item) => {
      return {
        course: item.title,
        instructor: item.instructorName,
      };
    });
    res.send({
      status: 0,
      msg: "The courses along with the instructors are ",
      data: courses,
    });
  } catch (error) {
    res.send({
      status: 1,
      msg: error,
      data: null,
    });
  }
});

module.exports = router;
