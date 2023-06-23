const express = require("express");
const storage = require("../../config/cloudinary");
const multer = require("multer");
const {
  createpostCtrl,
  deletepostCtrl,
  updatepostCtrl,
  postDetailsCtrl,
  fetchPostsCtrl,
  toggleLikesCtrl,
  toggleDisLikesPostCtrl,
} = require("../../controllers/posts/postCtrl");
const isLogin = require("../../middlewares/isLogin");
const postRouter = express.Router();

//file upload middleware
const upload = multer({ storage });

//POST/api/v1/post
postRouter.post("/", isLogin, upload.single("image"), createpostCtrl);

//GET/api/v1/posts/:id
postRouter.get("/:id", isLogin, postDetailsCtrl);

//GET/api/v1/post/likes/:id
postRouter.get("/likes/:id", isLogin, toggleLikesCtrl);

//GET/api/v1/post/likes/:id
postRouter.get("/dislikes/:id", isLogin, toggleDisLikesPostCtrl);

//GET/api/v1/post
postRouter.get("/", isLogin, fetchPostsCtrl);

//DELETE/api/v1/posts/:id
postRouter.delete("/:id", isLogin, deletepostCtrl);

//PUT/api/v1/posts/:id
postRouter.put("/:id", isLogin , upload.single("image"), updatepostCtrl);

module.exports = postRouter;
