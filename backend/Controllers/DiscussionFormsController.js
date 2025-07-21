import {ApiResponse} from "../Utils/ApiResponse.js";
import { Document,Comment } from "../Models/DiscussionForms.js";
export const getDiscussionForm = async (req, res) => {
    try {
        const result = await Document.find().populate("comments")

        return res.status(200).json(new ApiResponse(200, result, "Discussion forms retrieved successfully"));
    } catch (error) {
        console.log("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, null, "Internal server error"));
   
    }
}

export const createDiscussionForm = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        console.log(req.user)

        if (!title || !content || !req.user.id) {
            return res.status(400).json({ message: "Title, content, and authorId are required." });
        }

        const discussionForm = new Document({
            title,
            content,
            authorId:req.user.id,
            tags: tags || [],
            createdAt: new Date()
        });

        const savedForm = await discussionForm.save();

        return res.status(201).json(new ApiResponse(201, savedForm, "Discussion form created successfully"));


    } catch (error) {
        console.log("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, null, "Internal server error"));
   
    }
}
export const updateDiscussionForm = async (req, res) => {

    try {
        const { id } = req.params;
        const {tags, title, content} = req.body;
        console.log(req.body)
        console.log("Updating discussion form with ID:", id);

        const updatedForm = await Document.findOneAndUpdate({
            _id: id
        }, {
            tags,
            title,
            content
        }, {
            new: true // Return the updated document
        })

        if (!updatedForm) {
            return res.status(404).json({ message: "Discussion form not found." });
        }

        return res.status(200).json(new ApiResponse(200, updatedForm, "Discussion form updated successfully"));
    } catch (error) {
        console.log("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, null, "Internal server error"));
    }
}
export const deleteDiscussionForm = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Deleting discussion form with ID:", id);
        
        const deletedForm = await Document.findByIdAndDelete(id);

        if (!deletedForm) {
            return res.status(404).json({ message: "Discussion form not found." });
        }

        return res.status(200).json(new ApiResponse(200, deletedForm, "Discussion form deleted successfully"));
    } catch (error) {
        console.log("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, null, "Internal server error"));
    }
}

export const getDiscussionFormById = async (req, res) => {
    try {
        const { id } = req.params;

        const page = parseInt(req.query.page) || 1;
        const limit = 10
        const skip = (page-1) *limit

        const document = await Document.findById(id).lean()

        if (!document) {
            return res.status(404).json(new ApiResponse(404, null, "Document not found"));
        }

        //Fetch Paginated Comments
        const comments = await Comment.find({documentId:id})
                        .sort({createdAt:1})
                        .skip(skip)
                        .limit(limit)
                        .lean()

        const totalComments = await Comment.countDocuments({documentId:id})

        const totalPages = Math.ceil(totalComments/limit)

        return res.status(200).json(
            new ApiResponse(200, {
              ...document,
              comments,
              pagination: {
                page,
                totalPages,
                totalComments,
              }
            }, "Discussion form retrieved successfully")
          );


        //const getDiscussionFormById = await Document.findById(id).populate("comments");
        //return res.status(200).json(new ApiResponse(200, getDiscussionFormById, "Discussion form retrieved successfully"));
    } catch (error) {
        console.log("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, null, "Internal server error"));
    }
}


export const addComment = async (req, res) => {
    try {

        const { documentId, authorId, content } = req.body;
        console.log(req.user)
        if (!documentId || !req.user.id || !content) {
            return res.status(400).json({ message: "Document ID, author ID, and content are required." });
        }

        const comment = new Comment({
            documentId,
            authorId:req.user.id,
            text: content,
            createdAt: new Date()
        });

        await Document.findByIdAndUpdate(
            documentId,
            { $push: { comments: comment._id } },
            { new: true }
        );

        const savedComment = await comment.save();

        return res.status(201).json(new ApiResponse(201, savedComment, "Comment added successfully"));

    } catch (error) {
        console.log("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, null, "Internal server error"));
    }
}
export const getAllComments = async (req, res) => {
    try {
        // const {id} = req.params
        // const getAllCommentonForumId = await Document.findById(id).populate("comments")
        const {id} = req.params
        const discussion = await Document.findById(id);

        const comments = await Comment.find({documentId:id})
                        .populate("authorId","FirstName LastName")

        return res.status(200).json(new ApiResponse(201, comments, "Comment retrived successfully"));

    } catch (error) {
        console.log("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, null, "Internal server error"));
    }
}
