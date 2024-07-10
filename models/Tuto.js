//tuto schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tutoSchema = new Schema(
  {
    nameTuto: {
      type: String,
      required: true,
    },
    descriptionTuto: {
      type: String,
      required: true,
    },
    refTuto: {
      type: String,
    },
    category: {
      type: String,
      ref: "Category",
      required: true,
    },
    parcour: {
      type: String,
      ref: "Parcour",
      required: true,
    },

    imgTuto: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const Tuto = mongoose.model("Tuto", tutoSchema);

export default Tuto;
