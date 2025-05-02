import express from "express";
const router = express.Router();
import {Registration} from "../Controllers/AuthController.js";

router.post("/register",Registration);

export default router;