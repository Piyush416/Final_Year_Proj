import prisma from "../DBConnection/prismaClient.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

export const UtilityCollectionCreate = async (req, res) => {
    try {
        const { KeyField, Value } = req.body;

        const result = await prisma.utilityCollections.create(
            {
                data: {
                    KeyField,
                    Value
                }
            }
        )

        return res.status(200).json(new ApiResponse(200, result, "Success"));


    } catch (error) {
        console.error("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, null, "Internal server error"));
    }
};

export const UtilityCollectionCreateBasedOnId = async (req, res) => {
    try {
        const {ObjectId} = req.body;

        const result = await prisma.utilityCollections.findUnique({
            where:{
                id:ObjectId
            }
        })

        return res.status(200).json(new ApiResponse(200, result, "Success"));


    }catch (error) {
        console.error("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, null, "Internal server error"));

    }


}
export const getAllUtilityCollectionDocuments = async (req, res) => {
    try{
        const result = await prisma.utilityCollections.findMany();
        return res.status(200).json(new ApiResponse(200, result, "Success"));
    }
    catch (error) {
        console.error("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, null, "Internal server error"));
    }
}