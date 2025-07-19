import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
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
    }
},{timestamps:true})

export const User = mongoose.model("User", userSchema);