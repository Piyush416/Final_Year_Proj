import express from "express";
import {promptJSON, syncJSON} from "../Controllers/ChatbotController.js";
const router = express.Router();

router.post("/sync/json",syncJSON)
router.post("/query",promptJSON)

export default router;
