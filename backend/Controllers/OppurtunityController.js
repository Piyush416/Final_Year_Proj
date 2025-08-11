import {ApiResponse} from "../Utils/ApiResponse.js";
import { Oppurtunity } from "../Models/Oppurtunity.js";
import e from "express";
export const createOppurtunity = async (req, res) => {
  try {
    const { JobTitle, CompanyName, Location, Description, link } = req.body;
    const authorId = req.user.id; // Assuming user ID is stored in req.user after authentication
    if (!JobTitle || !CompanyName || !Location || !Description || !link || !authorId) {
      return res.status(400).json({ message: "All fields are required." });
    }



    const newOppurtunity = new Oppurtunity({
      JobTitle,
      CompanyName,
      Location,
      Description,
      link,
      authorId
    });

    const savedForm = await newOppurtunity.save();
    

    return res.status(201).json(new ApiResponse(200, savedForm, "Registration successful"));
    
  } catch (error) {
    console.log("Error:", error);
    return res
        .status(500)
        .json(new ApiResponse(500, null, "Internal server error"));
    
  }

}

export const getAllOppurtunities = async (req, res) => {
  try {
    const oppurtunities = await Oppurtunity.find().populate('authorId', 'name'); // Populate authorId with user details
    return res.status(200).json(new ApiResponse(200, oppurtunities, "Oppurtunities retrieved successfully"));
  } catch (error) {
    console.log("Error:", error);
    return res
        .status(500)
        .json(new ApiResponse(500, null, "Internal server error"));
  }
}

export const getOppurtunitiesById = async (req, res) => {
  try {
    const { id } = req.params;
    const oppurtunity = await Oppurtunity.findById(id).populate('authorId', 'name'); // Populate authorId with user details
    if (!oppurtunity) {
      return res.status(404).json(new ApiResponse(404, null, "Oppurtunity not found"));
    }
    return res.status(200).json(new ApiResponse(200, oppurtunity, "Oppurtunity retrieved successfully"));
  } catch (error) {
    console.log("Error:", error);
    return res
        .status(500)
        .json(new ApiResponse(500, null, "Internal server error"));
  }
}

export const deleteOppurtunity = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOppurtunity = await Oppurtunity.deleteOne({ _id: id, authorId: req.user.id }); // Ensure only the author can delete
    if (!deletedOppurtunity) {
      return res.status(404).json(new ApiResponse(404, null, "Oppurtunity not found"));
    }
    return res.status(200).json(new ApiResponse(200, deletedOppurtunity, "Oppurtunity deleted successfully"));
  } catch (error) {
    console.log("Error:", error);
    return res
        .status(500)
        .json(new ApiResponse(500, null, "Internal server error"));
  }
}