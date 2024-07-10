//Parcour schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const parcourSchema = new Schema(
  {
    nameParcour: {
      type: String,
      required: true,
    },
    descriptionParcour: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      ref: "Category",
      required: true,
    },
    tutos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tuto",
      },
    ],
    imgParcour: {
      type: String,
      required: true,
    },
    priceParcour: {
      type: Number,
      default: 1500,
    },
  },
  {
    timestamps: true,
  }
);

const Parcour = mongoose.model("Parcour", parcourSchema);

export default Parcour;
