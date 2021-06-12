const userSchema = require("../models/userModel");

//middleware to grant permission according to the role
const authInstructor = async (req, res, next) => {
  const { userId } = req.body;
  const result = await userSchema.findById(userId);
  const role = result.role;
  if (role == "I") {
    next();
  } else {
    res.status(401).send("acess denied");
  }
};

const authStudent = async (req, res, next) => {
  const result = await userSchema.findById(userId);
  const role = result.role;
  if (role == "S") {
    next();
  } else {
    res.status(401).send("acess denied");
  }
};
module.exports = { authInstructor, authStudent };
