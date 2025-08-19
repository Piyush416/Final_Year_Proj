import express from "express";
const router = express.Router();
import AuthMiddleware from "../Middleware/AuthMiddleware.js";
import { showProfile, UpdateProfile } from "../Controllers/ProfileController.js";

//TODO 
router.get("/profile",AuthMiddleware,showProfile);
router.put("/updateprofile",AuthMiddleware,UpdateProfile);

export default router;