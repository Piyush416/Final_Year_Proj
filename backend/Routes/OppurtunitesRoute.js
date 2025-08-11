import express from "express";
import { createOppurtunity,deleteOppurtunity,getAllOppurtunities,getOppurtunitiesById } from "../Controllers/OppurtunityController.js";
import AuthMiddleware from "../Middleware/AuthMiddleware.js";
const router = express.Router();

//TODO Changes in Dateof Birth
router.post("/createOppurtunity",AuthMiddleware,createOppurtunity)
router.get("/getAllOppurtunities",AuthMiddleware,getAllOppurtunities) 
router.get("/getAllOppurtunities/:id",AuthMiddleware,getOppurtunitiesById)
router.delete("/deleteOppurtunity/:id",AuthMiddleware,deleteOppurtunity)
export default router;