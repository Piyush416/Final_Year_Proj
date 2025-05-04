import prisma from "../DBConnection/prismaClient.js";
import {ApiResponse} from "../Utils/ApiResponse.js";

export const Registration = async (req,res) => {
    try {
        const {
            primaryEmail,FirstName,LastName,Password,
            Institution,Degree,typeofUser
        } = req.body;


        const result = await prisma.registration.create({
            data: {
                primaryEmail,
                FirstName,
                LastName,
                Password,
                Institution,
                Degree,
                typeOfUser:typeofUser
            }
        })

        return res.status(200).json(new ApiResponse(200, result, "Success"));

    }catch (error) {
        console.log("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, null, "Internal server error"));
    }
}

export const Login = async (req,res) =>{
    try {

    }
    catch (error) {
    }
}