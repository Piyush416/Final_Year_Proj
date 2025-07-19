import { RemoteConfig } from "../Models/RemoteConfig.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
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

