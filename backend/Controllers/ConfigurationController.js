import { RemoteConfig } from "../Models/RemoteConfig.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import {getCollegeDetails, getStreamDetails} from "../Utils/Utils.js";
import Profile from "../Models/Profile.js";

export const SideBarConfiguration = async (req, res) => {
    try {
        //console.log(req.query.name);

        const configName = req.query.name;

        const result = await RemoteConfig.find(
            {configName:configName}
        )

        return res.status(200).json(new ApiResponse(200, result, "Remote config fetched successfully"));

        //const data =

        //console.log("configName:", configName);

    } catch (error) {
        console.log("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, null, "Internal server error"));
    }

}

export const CreateRemoteConfig = async (req,res) => {
    try {
        const {configName,name,link} = req.body

        const remoteConfig = new RemoteConfig({
            configName,
            name,
            link
        })

        const result = await remoteConfig.save();
        return res.status(200).json(new ApiResponse(200, result, "Remote config created successfully"));
    } catch (error) {
        console.log("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, null, "Internal server error"));

    }
}

export const GetDropDownDetails = async (req,res) => {
    try{
        const id = req.params.id

        const result = await RemoteConfig.findOne({_id:id}).select("name")

        console.log(result)
        if(!result){
            return res.status(404).json(new ApiResponse(404, null, "Remote config not found"));
        }

        const stream = getCollegeDetails(result.name)

        if(!stream){
            return res.status(404).json(new ApiResponse(404, null, "Stream not found"));
        }

       return res.status(200).json(new ApiResponse(200, stream, "Stream details fetched successfully"));

    }
    catch (error) {
        console.log("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, null, "Internal server error"));

    }
}

export const getProfileDetailsBasedOnBranchAndCollege = async (req, res) => {
    try {
        const { selectedBranch, selectedCollege } = req.body;

        if (!selectedBranch || !selectedCollege) {
            return res
                .status(400)
                .json(new ApiResponse(400, null, "Branch and College are required"));
        }

        // Step 1: Get the college document
        const collegeDoc = await RemoteConfig.findOne({ _id: selectedCollege }).select("name");
        if (!collegeDoc) {
            return res
                .status(404)
                .json(new ApiResponse(404, null, "College not found"));
        }

        // Step 2: Find profiles for that college
        const profiles = await Profile.find({
            college: { $regex: collegeDoc.name, $options: "i" }
        }).populate("userId", "name");

        // Step 3: Filter in memory based on branch name
        const filteredProfiles = profiles.filter(profile =>
            profile.branchName?.toLowerCase().includes(selectedBranch.toLowerCase())
        );

        return res
            .status(200)
            .json(new ApiResponse(200, filteredProfiles, "Profiles fetched successfully"));
    } catch (error) {
        console.error("Error in getProfileDetailsBasedOnBranchAndCollege:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, null, "Internal server error"));
    }
};
