import jwt from "jsonwebtoken";

export const generateToken = (userId,role) => {
  return jwt.sign({ id: userId,userRole:role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};
