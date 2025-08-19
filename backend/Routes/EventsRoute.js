import express from "express";
const router = express.Router();
import { createEvent,getAllEvents,getEventById } from "../Controllers/EventsController.js";
import AuthMiddleware from "../Middleware/AuthMiddleware.js";

//TODO Changes in Dateof Birth
router.post("/createEvent", AuthMiddleware,createEvent);
router.get("/getAllEvents",AuthMiddleware, getAllEvents);
router.get("/getEventById/:id",AuthMiddleware, getEventById);

export default router;