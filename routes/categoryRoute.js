import express from "express";
import {
  createCategoryCtrl,
  deleteCategoryCtrl,
  getAllCategoriesCtrl,
  getSingleCategoryCtrl,
  updateCategoryCtrl,
} from "../controllers/categoryController.js";
import { isAuthAccess } from "../middelwares/isAuthAccess.js";

const categoriesRouter = express.Router();

categoriesRouter.get("/", getAllCategoriesCtrl);
categoriesRouter.get("/:id", getSingleCategoryCtrl);
categoriesRouter.delete("/:id/delete", isAuthAccess, deleteCategoryCtrl);
categoriesRouter.put("/:id", isAuthAccess, updateCategoryCtrl);
categoriesRouter.post("/add-category", isAuthAccess, createCategoryCtrl);

export default categoriesRouter;
