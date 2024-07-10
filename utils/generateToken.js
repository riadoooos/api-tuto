import jwt from "jsonwebtoken";

const generateToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_KEY, { expiresIn: "3d" });
};

export default generateToken;
