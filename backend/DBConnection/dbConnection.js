//TODO Adding Database Connection

import {MongoClient} from "mongodb"
const uri = process.env.DATABASE_URL
const client = new MongoClient(uri)

export async function connectToDatabase(){
    try{
        await client.connect();
        console.log("Connected to Database")
        return client.db("AlumniPortal")
    }catch (error){
        console.error("MongoDB Connection Error: ", error.message)
        throw error;
    }
}