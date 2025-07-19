import express from "express"
const router = express.Router()

import { SideBarConfiguration,CreateRemoteConfig } from "../Controllers/ConfigurationController.js"

router.get("/configuration", SideBarConfiguration)
router.post("/configuration/remote", CreateRemoteConfig)
export default router