import jwt from "jsonwebtoken";

export const generateToken = (userId,role) => {
  return jwt.sign({ id: userId,userRole:role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

export const verifyToken = (token) => {
  try {

    const decoded = jwt.decode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if(decoded.exp < currentTime){
      return false
    }
    return true;
    //console.log("Decoded JWT:", decoded);

    //return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("JWT verification error:", error);
    return false;
  }
}

export const decodeToken = (token) => {
  try {
    return jwt.decode(token).id;
  } catch (error) {
    
  }
}