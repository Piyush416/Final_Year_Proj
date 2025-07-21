import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
        trim:true,
        select:true
    },
    LastName:{
        type:String,
        required:true,
        trim:true,
        select:true
    },
    EnrollmentNumber:{
        type:String,
        required:true,
    },
    mobileNumber:{
        type:String,
        required:true,
        unique:true
    },
    primaryEmail:{
        type:String,
        required:true,
        unique:true
    },
    secondaryEmail:{
        type:String,
        required:true,
        unique:true
    },
    hashpassword:{
        type:String,
        required:true,
        select:true // This will prevent the password from being returned in queries
    },
    isEmailVerified:{
        type:Boolean,
        required:true,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    passingYear:{
        type:String,
        required:true
    }
},{timestamps:true})

export const User = mongoose.model("User", userSchema);