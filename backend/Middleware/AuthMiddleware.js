//TODO Adding Auth Middleware
import {ApiResponse} from "../Utils/ApiResponse.js";
import jwt from "jsonwebtoken"
const AuthMiddleware = async(req,res,next) => {
    try {
        const token = req.cookies?.token

        if(!token){
            return res
            .status(500)
            .json(new ApiResponse(401, null, {message:"Unauthorized:No Token"}));
    
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res
        .status(500)
        .json(new ApiResponse(401, null, {message:"Invalid or Expired Token"}));

    }
}

export default AuthMiddleware