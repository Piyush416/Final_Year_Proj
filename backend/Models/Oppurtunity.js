import mongoose from "mongoose";

const OppurtunitySchema = new mongoose.Schema({
    JobTitle: {
        type: String,
        required: true,
        trim: true
    },
    CompanyName: {
        type: String,
        required: true,
        trim: true
    },
    Location: {
        type: String,
        required: true,
        trim: true
    },
    Description: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });

export const Oppurtunity = mongoose.model("Oppurtunity", OppurtunitySchema);