import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";

export const getAllOrdersCtrl = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).sort({ createdAt: -1 });
  res.json({
    status: "success",
    message: "Orders fetched succefully in server web",
    orders,
  });
});

export const createOrderCtrl = asyncHandler(async (req, res) => {
  const { username, email, phone, wilaya, commune, address, parcours } =
    req.body;
  //Check if order is not empty
  if (parcours?.length <= 0) {
    throw new Error("No Order Items");
  }
  //Place/create order - save into DB
  const order = await Order.create({
    username,
    email,
    phone,
    wilaya,
    commune,
    address,
    parcours,
  });
  res.json({
    status: "success",
    order,
  });
});

export const getSingleOrderCtrl = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json({
    status: "success",
    message: "Order fetched successfully",
    order,
  });
});

export const updateOrderCtrl = asyncHandler(async (req, res) => {
  const { username, email, phone, wilaya, commune, address, parcours } =
    req.body;

  //update
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      username,
      email,
      phone,
      wilaya,
      commune,
      address,
      parcours,
    },
    {
      new: true,
    }
  );
  res.json({
    status: "success",
    message: "Order updated successfully",
    order,
  });
});

export const deleteOrderCtrl = asyncHandler(async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "Order deleted successfully",
  });
});
