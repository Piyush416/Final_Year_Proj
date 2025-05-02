import prisma from "../DBConnection/prismaClient.js";

export const Registration = (req,res) => {
    try {
        console.log("Registration")
        const {
            email,FirstName,LastName,Password,
            primaryEmailId,Gender,DateofBirth,startingYear,
            YearofPassing,Institution,Degree,Specialization,
            optedForHigherEducationfromOtherInstitues,
            highestLevelOfEduction,UniversityofHigherEducdation,
            Company,Title,Industry,WorkExp,PlaceofWork,Skills
        } = req.body;
        console.log(req.body);
    }catch (error) {

    }
}