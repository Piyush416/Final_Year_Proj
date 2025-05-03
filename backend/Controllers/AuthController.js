import prisma from "../DBConnection/prismaClient.js";
import {ApiResponse} from "../Utils/ApiResponse.js";

export const Registration = async (req,res) => {
    try {
        console.log("Registration")
        const {
            email,FirstName,LastName,Password,
            primaryEmailId,Gender,DateofBirth,startingYear,
            YearofPassing,Institution,Degree,Specialization,
            optedForHigherEducationfromOtherInstitues,
            highestLevelOfEduction,UniversityofHigherEducdation,
            Company,Title,Industry,WorkExp,PlaceofWork,Skills,currentAddress
        } = req.body;


        const result = await prisma.registration.create({
            data: {
                email,
                FirstName,
                LastName,
                Password,
                primaryEmailId,
                Gender,
                DateofBirth,
                startingYear,
                YearofPassing,
                Institution,
                Degree,
                Specialization,
                optedForHigherEducationfromOtherInstitues,
                highestLevelOfEduction,
                UniversityofHigherEducdation,
                Company,
                Title,
                Industry,
                WorkExp,
                PlaceofWork,
                Skills,
                currentAddress,
                typeOfUser:"Admin"
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