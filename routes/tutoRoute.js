import express from "express";
import {
  createTutoCtrl,
  deleteTutoCtrl,
  getAllTutosCtrl,
  getOneTutoCtrl,
  updateTutoCtrl,
} from "../controllers/tutoController.js";
import tutoFileUpload from "../middelwares/tutoUploadImg.js";
import { isAuthAccess } from "../middelwares/isAuthAccess.js";

const tutoRouter = express.Router();

tutoRouter.post(
  "/add-tuto",
  tutoFileUpload.single("imgTuto"),
  isAuthAccess,
  createTutoCtrl
);
tutoRouter.get("/", getAllTutosCtrl);
tutoRouter.get("/:id", getOneTutoCtrl);
tutoRouter.put("/:id", isAuthAccess, updateTutoCtrl);
tutoRouter.delete("/:id/delete", isAuthAccess, deleteTutoCtrl);

export default tutoRouter;
