import express from "express";
import { accessCtrl, hashPassword } from "../controllers/accessController.js";

const accessRouter = express.Router();

accessRouter.post("/admin", hashPassword);
accessRouter.post("/admin/access", accessCtrl);

export default accessRouter;
