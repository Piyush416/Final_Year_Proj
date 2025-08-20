import express from "express"
const router = express.Router()

import {
    SideBarConfiguration,
    CreateRemoteConfig,
    GetDropDownDetails,
    getProfileDetailsBasedOnBranchAndCollege
} from "../Controllers/ConfigurationController.js"
import AuthMiddleware from "../Middleware/AuthMiddleware.js";

router.get("/configuration", SideBarConfiguration)
router.post("/configuration/remote", CreateRemoteConfig)
router.get("/configuration/getDegreeDropDownList/:id",GetDropDownDetails)
router.post("/getProfileDetailsBasedOnBranchAndCollege",AuthMiddleware,getProfileDetailsBasedOnBranchAndCollege)
export default router
