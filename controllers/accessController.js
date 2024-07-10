import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

export const accessCtrl = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const my_username = process.env.ADMIN_NAME;
  const my_password = process.env.ADMIN_PASS;

  if (
    username === my_username &&
    (await bcrypt.compare(password, my_password))
  ) {
    res.json({
      status: "success",
      message: "User logged in successfully",
      token: generateToken(username),
    });
  } else {
    throw new Error("Invalid login credentials");
  }
});

export const hashPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  res.json({
    hashedPassword,
  });
});
