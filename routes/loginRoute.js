const express = require("express");
const userSchema = require("../models/userModel");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email: email });
    if (!user) return res.send({ message: "email is incorrect" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.send({ message: "invalid password" });

    res.send({
      msg: "logged in",
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
