const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
const { appErr } = require("../../utils/appErr");

//create post
const createpostCtrl = async (req, res, next) => {
  const { title, description, category } = req.body;
  try {
    //1. Find the user
    const author = await User.findById(req.userAuth);
    //check if the user is blocked
    if (author.isBlocked) {
      return next(appErr("Access denied, account blocked", 403));
    }

    //2. create the post
    const postCreated = await Post.create({
      title,
      description,
      user: author._id,
      category,
      photo: req?.file?.path,
    });
    //3. Associate user to a post -push the post into the user posts field
    author.posts.push(postCreated);
    //save
    await author.save();
    res.json({
      staus: "success",
      data: postCreated,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//all
const fetchPostsCtrl = async (req, res, next) => {
  try {
    //Find all posts
    const posts = await Post.find({})
      .populate("user")
      .populate("category", "title");

    //check if the user is block by tge post owner
    const filteredPost = posts.filter((post) => {
      //get all block users.
      const blockedUsers = post.user.blocked;
      const isBlocked = blockedUsers.includes(req.userAuth);

      //  return isBlocked ? null : post ;
      return !isBlocked;
    });

    res.json({
      staus: "success",
      data: filteredPost,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//togglelike
const toggleLikesCtrl = async (req, res,next) => {
  try {
    //1. Get the post
    const post = await Post.findById(req.params.id);
    //2. Check if the user has already like the post
    const isLiked = post.likes.includes(req.userAuth);
    //3. If the user has already liked the post,unlike the post
    if (isLiked) {
      post.likes = post.likes.filter(
        (like) => like.toString() != req.userAuth.toString()
      );
      await post.save();
    } else {
      //4. If the user has not liked the post, like the post
      post.likes.push(req.userAuth);
      await post.save();
    }
    res.json({
      staus: "success",
      data: "you have success fully liked the post",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//togg DisLike
const toggleDisLikesPostCtrl = async (req, res, next) => {
  try {
    //1. Get the post
    const post = await Post.findById(req.params.id);
    //2. Check if the user has already unliked the post
    const isUnliked = post.disLikes.includes(req.userAuth);
    //3. If the user has already liked the post, unlike the post
    if (isUnliked) {
      post.disLikes = post.disLikes.filter(
        (dislike) => dislike.toString() !== req.userAuth.toString()
      );
      await post.save();
    } else {
      //4. If the user has not liked the post, like the post
      post.disLikes.push(req.userAuth);
      await post.save();
    }
    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//single
const postDetailsCtrl = async (req, res, next) => {
  try {
    //find the post
    const post = await Post.findById(req.params.id);
    //Number of view
    //check if user viewed this post
    const isViewed = post.numViews.includes(req.userAuth);
    if (isViewed) {
      res.json({
        status: "success",
        data: post,
      });
    } else {
      //pust the user into numOfViews

      post.numViews.push(req.userAuth);
      //save
      await post.save();
      res.json({
        status: "success",
        data: post,
      });
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

//delete
const deletepostCtrl = async (req, res, next) => {
  try {
    //check the  post belongs to the user

    //find the post
    const post = await Post.findByIdAndDelete(req.params.id);
    if (post.user.toString() !== req.userAuth.toString()) {
      return next(appErr("you are not allowed to delete this post", 403));
    }
    await Post.findByIdAndDelete(req.params.id);
    res.json({
      staus: "success",
      data: "delete deleted successfully",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//update
const updatepostCtrl = async (req, res, next) => {
  const { title, description, category } = req.body;
  try {
    //find the post
    const post = await Post.findById(req.params.id);
    //check if the post belongs to the user

    if (post.user.toString() !== req.userAuth.toString()) {
      return next(appErr("You are not allowed to delete this post", 403));
    }
    await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        photo: req?.file?.path,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

module.exports = {
  createpostCtrl,
  deletepostCtrl,
  updatepostCtrl,
  postDetailsCtrl,
  fetchPostsCtrl,
  toggleLikesCtrl,
  toggleDisLikesPostCtrl,
};
