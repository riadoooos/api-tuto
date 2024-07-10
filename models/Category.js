//category schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    nameCat: {
      type: String,
      required: true,
    },
    parcours: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parcour",
      },
    ],
    tutos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tuto",
      },
    ],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);

export default Category;
