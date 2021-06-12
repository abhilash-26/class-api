const userSchema = require("../models/userModel");

//middleware to grant permission according to the role
const authUser = async (req, res, next) => {
  const { userId } = req.body;
  const result = await userSchema.findById(userId);
  const role = result.role;
  console.log(role);
  if (role == "I") {
    next();
  } else {
    res.status(401).send("acess denied");
  }
};
module.exports = { authUser };
