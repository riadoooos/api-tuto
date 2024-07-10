import asyncHandler from "express-async-handler";
import Parcour from "../models/Parcour.js";
import Category from "../models/Category.js";

export const createParcourCtrl = asyncHandler(async (req, res) => {
  const { nameParcour, descriptionParcour, category } = req.body;

  //Parcour exist
  const parcourExist = await Parcour.findOne({ nameParcour });
  if (parcourExist) {
    throw new Error("Nom de Parcour existe deja");
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
  //create the parcour
  const parcour = await Parcour.create({
    nameParcour,
    descriptionParcour,
    category,
    imgParcour: req?.file?.path,
  });

  //push the parcour into category
  categoryFound?.parcours?.push(parcour._id);
  //resave
  await categoryFound.save();

  res.json({
    status: "success",
    message: "Parcour created successfully",
    parcour,
  });
});

export const getAllParcoursCtrl = asyncHandler(async (req, res) => {
  console.log(req.query);
  //query
  let parcourQuery = Parcour.find();
  // search by name
  if (req.query.name) {
    parcourQuery = parcourQuery.find({
      name: { $regex: req.query.name, $options: "i" },
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
  const total = await Parcour.countDocuments();

  parcourQuery = parcourQuery.skip(startIndex).limit(limit);

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
  const parcours = await parcourQuery.sort({ createdAt: -1 });
  //.populate("tutos");
  res.json({
    status: "success",
    total,
    results: parcours.length,
    pagination,
    message: "Parcours fetched successfully",
    parcours,
  });
});

export const getOneParcourCtrl = asyncHandler(async (req, res) => {
  const parcour = await Parcour.findById(req.params.id);

  if (!parcour) {
    throw new Error("Parcour not found");
  }
  res.json({
    status: "success",
    message: "Parcour fetched successfully",
    parcour,
  });
});

export const updateParcourCtrl = asyncHandler(async (req, res) => {
  const { nameParcour, descriptionParcour, category } = req.body;
  //update
  const parcour = await Parcour.findByIdAndUpdate(
    req.params.id,
    { nameParcour, descriptionParcour, category, imgParcour: req?.file?.path },
    {
      new: true,
    }
  );
  res.json({
    status: "success",
    message: "Parcour updated successfully",
    parcour,
  });
});

export const deleteParcourCtrl = asyncHandler(async (req, res) => {
  await Parcour.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "Parcour deleted successfully",
  });
});
