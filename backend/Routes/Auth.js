import express from "express";
const router = express.Router();
import {Registration} from "../Controllers/AuthController.js";

//TODO Changes in Dateof Birth
router.post("/register",Registration);

export default router;