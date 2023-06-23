const express = require("express");
const userRouter = require("./routes/users/userRoutes");
const postRouter = require("./routes/post/postRouter");
const categoryRouter = require("./routes/category/categoryRoutes");
const commentRouter = require("./routes/comments/commentRoutes");
const globalErrHandeler = require("./middlewares/globalErrHandler");
const isAdmin = require("./middlewares/isAdmin");

require("dotenv").config();
require("./config/dbconnect");
const app = express();

console.log(app);

//middlewares

app.use(express.json()); //pass incoming payload

//routes

//user route
app.use("/api/v1/users/", userRouter);

//POST route
app.use("/api/v1/posts", postRouter);

//comment route
app.use("/api/v1/comments", commentRouter);

//categories route
app.use("/api/v1/categories", categoryRouter);

//Error handlers middleware
app.use(globalErrHandeler);

//404 error
app.use("*", (req, res) => {
  console.log(req.originalUrl);
  res.status(404).json({
    message: `${req.originalUrl} - Route Not Found`,
  });
});
//Listen to server
const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server is up and running on ${PORT}`));
