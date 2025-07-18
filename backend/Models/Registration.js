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
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
},{timestamps:true})

module.exports = mongoose.model("Registration",userSchema)