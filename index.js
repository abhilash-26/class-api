const express = require("express");
const mongoose = require("mongoose");
const registerrouter = require("./routes/registerRoute");
const loginrouter = require("./routes/loginRoute");
const manageClassRoute = require("./routes/manageClassRoute");
const viewCourseRoute = require("./routes/viewCourseRoute");

const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://task1:task1@cluster0.ramnh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Connected To the database");
  })
  .catch((error) => {
    console.log(error);
  });

const PORT = 8000;

app.listen(PORT, () => console.log("server is up and running..."));

app.use("/class-management", registerrouter);
app.use("/class-management", loginrouter);
app.use("/class-management", manageClassRoute);
app.use("/class-management", viewCourseRoute);
