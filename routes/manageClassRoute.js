const express = require("express");
const courseSchema = require("../models/classModel");
const userSchema = require("../models/userModel");

//middleware for permission acoording to roles
const { authUser } = require("../middleware/authUser");

const router = express.Router();

{
  /*  To create a course
   */
}
router.post("/instructor/create-new-course", authUser, async (req, res) => {
  try {
    //instructorId to be sent by clientside which was stored in session storage after login
    const { title, userId, courseDuration, courseCharge, studentsEnrolled } =
      req.body;
    const instructorName = await userSchema.findById(userId);
    const createdClass = await courseSchema.create({
      title: title,
      instructorId: userId,
      instructorName: instructorName.name,
      courseDuration: courseDuration,
      courseCharge: courseCharge,
      studentsEnrolled: studentsEnrolled,
    });
    res.send({
      status: 0,
      msg: "course created successfully",
      data: createdClass,
    });
  } catch (error) {
    res.send({
      status: 1,
      msg: error,
      data: null,
    });
  }
});

{
  /*  To view all the courses created by the instructor
   */
}
router.post("/instructor/get-all-course", async (req, res) => {
  try {
    const allCourses = await courseSchema.find();
    res.send({
      status: 0,
      msg: "All courses are",
      data: allCourses,
    });
  } catch (error) {
    res.send({
      status: 1,
      msg: error,
      data: null,
    });
  }
});

{
  /*  To edit a course where the course duration or course fee can be increased or decreased
   */
}

router.post("/instructor/edit-course", authUser, async (req, res) => {
  try {
    const { courseId, title, courseDuration, courseCharge } = req.body;
    await courseSchema.findByIdAndUpdate(courseId, {
      $set: {
        title: title,
        courseDuration: courseDuration,
        courseCharge: courseCharge,
      },
    });
    res.send({
      status: 0,
      msg: "Course updated sucessfully",
    });
  } catch (error) {
    res.send({
      status: 1,
      msg: error,
    });
  }
});

{
  /* To remove a course which was created earlier
   */
}
router.post("/instructor/remove-course", authUser, async (req, res) => {
  try {
    const { toBeDeleatedId } = req.body;
    const removedCourse = await courseSchema.findByIdAndDelete(toBeDeleatedId);
    res.send({
      status: 0,
      msg: "course is deleated sucessfully",
      data: removedCourse,
    });
  } catch (error) {
    res.send({
      status: 1,
      msg: error,
    });
  }
});

{
  /* To add a student to the course, the parameters received is the course ID and student ID
   */
}

router.post("/instructor/add-student", authUser, async (req, res) => {
  try {
    const { courseId, studentId } = req.body;
    const result = await courseSchema.findById(courseId);
    const students = result.studentsEnrolled;
    students.push(studentId);
    await courseSchema.findByIdAndUpdate(courseId, {
      $set: {
        studentsEnrolled: students,
      },
    });
    console.log(students);
  } catch (error) {}
});

{
  /* To remove a student from the course, the parameters received is the course ID and student ID
   */
}
router.post("/instructor/remove-student", authUser, async (req, res) => {
  try {
    const { courseId, studentId } = req.body;
    const result = await courseSchema.findById(courseId);
    const students = result.studentsEnrolled;
    const updated = students.filter((item) => item != studentId);
    await courseSchema.findByIdAndUpdate(courseId, {
      $set: {
        studentsEnrolled: updated,
      },
    });
    res.send({
      status: 0,
      msg: "Students updated sucessfully",
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
