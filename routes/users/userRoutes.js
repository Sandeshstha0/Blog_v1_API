const express = require("express");
const {
  userRegisterCtrl,
  userLoginCtrl,
  usersCtrl,
  userProfileCtrl,
  updateUserCtrl,
  profilPhotoUploadCtrl,
  whoViewedMyProfileCtrl,
  followingCtrl,
  unFollowCtrl,
  blockUserCtrl,
  unblockUserCtrl,
  adminBlockUserCtrl,
  adminUnblockUserCtrl,
  updatePasswordCtrl,
  deleteUserAccountCtrl
} = require("../../controllers/users/userCtrl");
const isLogin = require("../../middlewares/isLogin");
const storage = require("../../config/cloudinary");
const userRouter = express.Router();
const multer = require("multer");
const isAdmin = require("../../middlewares/isAdmin");

//instance of multer
const upload = multer({ storage });

//postT/api/v1/users
userRouter.get("/", usersCtrl);

//POST/api/v1/users/login
userRouter.post("/login", userLoginCtrl);

//GET/api/v1/users/profile/:id
userRouter.get("/profile/", isLogin, userProfileCtrl);



// POST /api/v1/users/register
userRouter.post("/register", userRegisterCtrl);



//PUT/api/v1/users/:id
userRouter.put("/",isLogin , updateUserCtrl);

//GET/api/v1/users/profile-vierwers/:id
userRouter.get("/profile-viewers/:id", isLogin, whoViewedMyProfileCtrl);

//GET/api/v1/users/following/:id
userRouter.get("/following/:id", isLogin, followingCtrl);

//GET/api/v1/users/unFollow:id
userRouter.get("/unfollowing/:id", isLogin, unFollowCtrl);

//GET/api/v1/users/block/:id
userRouter.get("/block/:id", isLogin, blockUserCtrl);

//GET/api/v1/users/unblock/:id
userRouter.get("/unblock/:id", isLogin, unblockUserCtrl);

//put/api/v1/users/unblovk/:id
userRouter.put("/admin-block/:id", isLogin, isAdmin, adminBlockUserCtrl);

//put/api/v1/users/unblovk/:id
userRouter.put("/admin-unblock/:id", isLogin, isAdmin, adminUnblockUserCtrl);

//put/api/v1/users/update-password
userRouter.put("/update-password", isLogin, updatePasswordCtrl);

//DELETE/api/v1/users/unblock/:id
userRouter.delete("/delete-account", isLogin, deleteUserAccountCtrl);

//Post/api/v1/users/:id
userRouter.post(
  "/profile-photo-upload",
  isLogin,
  upload.single("profile"),
  profilPhotoUploadCtrl
);

module.exports = userRouter;
