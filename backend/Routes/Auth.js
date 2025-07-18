import express from "express";
const router = express.Router();
import {Login, Registration} from "../Controllers/AuthController.js";

//TODO Changes in Dateof Birth
router.post("/register",Registration);
router.post("/login",Login)

export default router;