// db.js or database.js

import mongoose from "mongoose";

const uri = "mongodb+srv://lastyearprojectby4:1234@cluster0.vds3qk4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
export async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {});

    console.log("✅ Connected to MongoDB with Mongoose");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw error;
  }
}
