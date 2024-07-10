import mongoose from "mongoose";
//Generate random numbers for order
const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumbers = Math.floor(1000 + Math.random() * 90000);

//schema

const orderSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    parcours: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parcour",
      },
    ],
    wilaya: {
      type: String,
      required: true,
    },
    commune: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    orderNumber: {
      type: String,
      default: randomTxt + randomNumbers,
    },
    totalPrice: {
      type: Number,
      default: 0.0,
    },

    //For admin
    status: {
      type: String,
      default: "encour",
      enum: ["encour", "delivere"],
    },
    deliveredAt: {
      type: Date,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//!compile schema to  model
const Order = mongoose.model("Order", orderSchema);

export default Order;
