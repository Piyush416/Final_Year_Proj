import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  },
  text: String,
  authorId: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const DocumentSchema = new mongoose.Schema({
  title: String,
  content: String,
  authorId: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  tags: [
    {
      type: String
    }
  ] 
});

export const Comment = mongoose.model('Comment', CommentSchema);
export const Document = mongoose.model('Document', DocumentSchema);
