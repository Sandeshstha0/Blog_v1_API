const express = require("express");
const {
  categoryDetailsCtrl,
  createCategoryCtrl,
  deleteCategoryCtrl,
  fetchCategoryCtrl,
  updateCategoryCtrl
} = require("../../controllers/categories/categoriesCtrl");
const isLogin = require("../../middlewares/isLogin");

const categoryRouter = express.Router();

//POST/api/v1/categories
categoryRouter.post("/", isLogin ,createCategoryCtrl);

//GET/api/v1/categories
categoryRouter.get("/", fetchCategoryCtrl);


//GET/api/v1/categories/:id
categoryRouter.get("/:id", categoryDetailsCtrl);

//PUT/api/v1/categories/:id
categoryRouter.put("/:id", isLogin, updateCategoryCtrl);

//DELETE/api/v1/categories/:id
categoryRouter.delete("/:id", isLogin ,deleteCategoryCtrl);

module.exports = categoryRouter;
