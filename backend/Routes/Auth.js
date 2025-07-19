import express from "express";
const router = express.Router();
import {Login, Registration,checkCurrentUser} from "../Controllers/AuthController.js";

//TODO Changes in Dateof Birth
router.post("/register",Registration);
router.post("/login",Login)
router.get("/checkUser",checkCurrentUser)

export default router;