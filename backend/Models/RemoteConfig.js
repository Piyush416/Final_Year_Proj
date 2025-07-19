import mongoose from "mongoose";

const remoteConfigSchema = new mongoose.Schema({
    configName: {
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: false
    }
})

export const RemoteConfig = mongoose.model("RemoteConfig", remoteConfigSchema);