import express from "express";
import { createDiscussionForm,deleteDiscussionForm,getDiscussionForm,updateDiscussionForm,getDiscussionFormById, addComment, getAllComments } from "../Controllers/DiscussionFormsController.js";
import AuthMiddleware from "../Middleware/AuthMiddleware.js";
const router = express.Router();

router.get("/get-all-discussion-form",AuthMiddleware,getDiscussionForm) 
router.post("/create-discussion-form",AuthMiddleware, createDiscussionForm);
router.put("/update-discussion-form/:id",AuthMiddleware,updateDiscussionForm);
router.delete("/delete-discussion-form/:id",AuthMiddleware,deleteDiscussionForm)
router.get("/get-discussion-form/:id", AuthMiddleware,getDiscussionFormById);

router.post("/add-comment",AuthMiddleware,addComment)
router.post("/get-all-comments/:id",AuthMiddleware,getAllComments)
export default router;