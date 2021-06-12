const express = require("express");
const courseSchema = require("../models/classModel");
const router = express.Router();
const { authStudent } = require("../middleware/authUser");

//To get all the courses and the corosponding instructors
router.post("/student/view-course", authStudent, async (req, res) => {
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
      msg: "The courses along with the corrosponding instructors are ",
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
