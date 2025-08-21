import express from "express";
const router = express.Router();
import AuthMiddleware from "../Middleware/AuthMiddleware.js";
import {getAllProfiles, getProfileById, showProfile, UpdateProfile} from "../Controllers/ProfileController.js";

//TODO
router.get("/profile",AuthMiddleware,showProfile);
router.put("/updateprofile",AuthMiddleware,UpdateProfile);
router.get("/getProfiles",AuthMiddleware,getAllProfiles);
router.get("/profile/:id",AuthMiddleware,getProfileById);
export default router;
