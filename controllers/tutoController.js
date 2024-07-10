import Tuto from "../models/Tuto.js";
import Category from "../models/Category.js";
import Parcour from "../models/Parcour.js";
import asyncHandler from "express-async-handler";

export const getAllTutosCtrl = asyncHandler(async (req, res) => {
  //query
  let tutoQuery = Tuto.find();
  // search by name
  if (req.query.name_tuto) {
    tutoQuery = tutoQuery.find({
      name: { $regex: req.query.name_tuto, $options: "i" },
    });
  }

  //filter by category
  if (req.query.category) {
    parcourQuery = parcourQuery.find({
      category: { $regex: req.query.category, $options: "i" },
    });
  }

  //pagination
  //page
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  //limit
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
  //startIdx
  const startIndex = (page - 1) * limit;
  //endIdx
  const endIndex = page * limit;
  //total
  const total = await Tuto.countDocuments();

  tutoQuery = tutoQuery.skip(startIndex).limit(limit);

  //pagination results
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  //await the query
  const tutos = await tutoQuery.sort({ createdAt: -1 });

  res.json({
    status: "success",
    total,
    results: tutos.length,
    pagination,
    message: "Tutos fetched successfully",
    tutos,
  });
});

export const createTutoCtrl = asyncHandler(async (req, res) => {
  const { nameTuto, descriptionTuto, refTuto, category, parcour } = req.body;

  //Parcour exist
  const tutoExist = await Tuto.findOne({ nameTuto });
  if (tutoExist) {
    throw new Error("Nom de Tuto existe deja");
  }

  //find the category
  const categoryFound = await Category.findOne({
    nameCat: category,
  });
  if (!categoryFound) {
    throw new Error(
      "Category not found, please create category first or check category name"
    );
  }

  //find the parcour
  const parcourFound = await Parcour.findOne({
    nameParcour: parcour,
  });
  if (!parcourFound) {
    throw new Error(
      "Parcour not found, please create parcour first or check parcour name"
    );
  }
  //create the tuto
  const tuto = await Tuto.create({
    nameTuto,
    descriptionTuto,
    category,
    parcour,
    imgTuto: req?.file?.path,
  });

  //push the tuto into category
  categoryFound.tutos.push(tuto._id);
  //resave
  await categoryFound.save();

  //push the tuto into parcour
  parcourFound.tutos.push(tuto._id);
  //resave
  await parcourFound.save();

  res.json({
    status: "success",
    message: "Tuto created successfully",
    tuto,
  });
});

export const getOneTutoCtrl = asyncHandler(async (req, res) => {
  const tuto = await Tuto.findById(req.params.id);

  if (!tuto) {
    throw new Error("Tuto not found");
  }
  res.json({
    status: "success",
    message: "Tuto fetched successfully",
    tuto,
  });
});

export const updateTutoCtrl = asyncHandler(async (req, res) => {
  const { nameTuto, descriptionTuto, refTuto, category, parcour } = req.body;
  //update
  const tuto = await Tuto.findByIdAndUpdate(
    req.params.id,
    {
      nameTuto,
      descriptionTuto,
      refTuto,
      category,
      parcour,
      imgTuto: req?.file?.path,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json({
    status: "success",
    message: "Tuto updated successfully",
    tuto,
  });
});

export const deleteTutoCtrl = asyncHandler(async (req, res) => {
  await Parcour.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "Parcour deleted successfully",
  });
});
