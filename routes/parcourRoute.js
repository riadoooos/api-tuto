import express from "express";
import {
  createParcourCtrl,
  deleteParcourCtrl,
  getAllParcoursCtrl,
  getOneParcourCtrl,
  updateParcourCtrl,
} from "../controllers/parcourController.js";
import parcourFileUpload from "../middelwares/parcourUploadImg.js";
import { isAuthAccess } from "../middelwares/isAuthAccess.js";

const parcourRouter = express.Router();

parcourRouter.post(
  "/add-parcour",
  parcourFileUpload.single("imgParcour"),
  isAuthAccess,
  createParcourCtrl
);

parcourRouter.get("/", getAllParcoursCtrl);
parcourRouter.get("/:id", getOneParcourCtrl);
parcourRouter.put("/:id", isAuthAccess, updateParcourCtrl);
parcourRouter.delete("/:id/delete", isAuthAccess, deleteParcourCtrl);

export default parcourRouter;
