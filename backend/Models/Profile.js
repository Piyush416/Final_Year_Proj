import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  college: {
    type: String,
    maxlength: 100,
    default: '',
  },
  degree: {
    type: String,
    maxlength: 100,
    default: '',
  },
  branchName: {
    type: String,
    maxlength: 100,
    default: '',
  },
  skills: {
    type: [String],
    default: [],
  },
  bio: {
    type: String,
    maxlength: 500,
    default: '',
  },
  location: {
    type: String,
    maxlength: 100,
    default: '',
  },
  website: {
    type: String,
    maxlength: 200,
    default: '',
  },
  socialLinks: {
    twitter: {
      type: String,
      maxlength: 100,
      default: '',
    },
    facebook: {
      type: String,
      maxlength: 100,
      default: '',
    },
    linkedin: {
      type: String,
      maxlength: 100,
      default: '',
    },
    instagram: {
      type: String,
      maxlength: 100,
      default: '',
    },
  },
  profilePicture: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Profile', profileSchema);