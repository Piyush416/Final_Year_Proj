import express from "express";
import {promptJSON, syncFromMongo, syncJSON} from "../Controllers/ChatbotController.js";
const router = express.Router();

router.post("/sync/json",syncJSON)
router.post("/query",promptJSON)
router.get("/sync/mongodb",syncFromMongo)

export default router;
