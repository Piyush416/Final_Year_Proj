// TODO: Add Database Connection

import mongoose from "mongoose"

const uri = "mongodb+srv://lastyearprojectby4:Admin%40123@cluster0.vds3qk4.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"
export async function connectToDatabase() {
  try {
    await mongoose.connect(uri)
    console.log("✅ Connected to MongoDB")
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message)
    throw error
  }
}
