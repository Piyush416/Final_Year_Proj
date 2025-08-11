import {ApiResponse} from "../Utils/ApiResponse.js";
import Profile  from "../Models/Profile.js";
import  {User} from "../Models/Registration.js";
export const showProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }
        const userProfile = await User.findOne({ _id: userId }); 
        if (!userProfile) {
            return res.status(404).json(new ApiResponse(404, null, "User not found"));
        }

         // Fetch the profile associated with the user
        const profile = await Profile.findOne({ userId }); // Populate user details
        if (!profile) {
            return res.status(404).json(new ApiResponse(404, {userProfile,profile}, "Profile not found"));
        }

        return res.status(200).json(new ApiResponse(200, profile, "Profile retrieved successfully"));
    } catch (error) {
         return res
        .status(500)
        .json(new ApiResponse(500, null, "Internal server error"));
    }
}

export const UpdateProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }
        const {
            college,
            degree,
            branchName,
            skills,
            bio,
            location,
            website,
            socialLinks: {
                twitter,
                facebook,
                linkedin,
                instagram
            }
        } = req.body;

        const profileData = {
            userId,
            college,
            degree,
            branchName,
            skills,
            bio,
            location,
            website,
            socialLinks: {
                twitter,
                facebook,
                linkedin,
                instagram
            }
        };

        const updatedProfile = await Profile.findOneAndUpdate(
            { userId },
            profileData,
            { new: true, upsert: true } // Create if not exists
        );

        if (!updatedProfile) {
            return res.status(404).json(new ApiResponse(404, null, "Profile not found or could not be updated"));
        }

        return res.status(200).json(new ApiResponse(200, updatedProfile, "Profile updated successfully"));
        

    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json(new ApiResponse(500, null, "Internal server error"));
        
    }
}