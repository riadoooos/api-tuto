import express from "express";
import {
  createOrderCtrl,
  deleteOrderCtrl,
  getAllOrdersCtrl,
  getSingleOrderCtrl,
  updateOrderCtrl,
} from "../controllers/orderController.js";
import { isAuthAccess } from "../middelwares/isAuthAccess.js";

const orderRouter = express.Router();

orderRouter.get("/", isAuthAccess, getAllOrdersCtrl);
orderRouter.get("/:id", getSingleOrderCtrl);
orderRouter.delete("/:id/delete", deleteOrderCtrl);
orderRouter.put("/:id", updateOrderCtrl);
orderRouter.post("/add-order", createOrderCtrl);

export default orderRouter;
