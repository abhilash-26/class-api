const express = require("express");
const userSchema = require("../models/userModel");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/user/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log("running");
    const savedemail = await userSchema.findOne({
      email: email,
    });
    if (savedemail) return res.send({ message: "email is already in use" });

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const createdUser = await userSchema.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.send({
      status: 0,
      msg: "User registered successfully",
      data: createdUser,
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
