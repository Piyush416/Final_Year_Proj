import express from "express";
import { createDiscussionForm,deleteDiscussionForm,getDiscussionForm,updateDiscussionForm,getDiscussionFormById, addComment } from "../Controllers/DiscussionFormsController.js";
const router = express.Router();

router.get("/get-all-discussion-form",getDiscussionForm) 
router.post("/create-discussion-form", createDiscussionForm);
router.put("/update-discussion-form/:id",updateDiscussionForm);
router.delete("/delete-discussion-form/:id", deleteDiscussionForm)
router.get("/get-discussion-form/:id", getDiscussionFormById);

router.post("/add-comment",addComment)
export default router;