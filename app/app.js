import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import morgan from "morgan";
import dbConnect from "../config/dbConnect.js";
import { globalErrhandler, notFound } from "../middelwares/globalErrhandler.js";
import parcourRouter from "../routes/parcourRoute.js";
import categoriesRouter from "../routes/categoryRoute.js";
import tutoRouter from "../routes/tutoRoute.js";
import orderRouter from "../routes/orderRoute.js";
import accessRouter from "../routes/accessRoute.js";

//db connect
dbConnect();

const app = express();

app.use(cors());

//pass incoming data
app.use(express.json());

//routes
//Home route

//use morgan
app.use(morgan("tiny"));

//routes
//Home route
//app.use("/api/v1/users/", userRoutes);
app.use("/api/v1/categories/", categoriesRouter);
app.use("/api/v1/parcours/", parcourRouter);
app.use("/api/v1/tutos", tutoRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/users", accessRouter);

//err middleware
app.use(notFound);
app.use(globalErrhandler);

export default app;
