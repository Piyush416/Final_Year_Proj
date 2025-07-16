import express from 'express';
import 'dotenv/config'
import {ApiResponse} from "./Utils/ApiResponse.js";


const app = express();
const port = process.env.PORT || 3001;

app.get("/",(req,res) =>{
    res.json(new ApiResponse(200,"Server is Up and Running"))
})

app.listen(port, () => console.log(`Server app listening on port ${port}!`));
=======
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")

const PORT = 8080;

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const MONGO_URL = "mongodb+srv://lastyearprojectby4:1234@cluster0.vds3qk4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


mongoose.connect(MONGO_URL).then(() => {
    console.log("MongoDb connection Est.")
}).catch(() => {
    console.log("Failed to Connect DataBase")
})


const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("Connected to MongoDB database:", connection.db.databaseName);
});

connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});



// schema

const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    enrollmentNo: {
        type: Number,
        unique: true,
        required: true
    },
    passYear: Number,
    studentEmail: String,
    studentPass: String
})

const studentModel = mongoose.model("student", studentSchema)


// student login
app.post("/student/login", async (req, res) => {
    const { email, pass } = req.body;
    const data = await studentModel.findOne({ studentEmail: email });
    if (data && data.studentPass == pass) {
        res.status(201).json({ message: "Login SuccessFully" });
    }
    else {
        res.status(500).json({ message: "Invalid Credentials" });
    }
})



// registration student
app.post("/student/register", async (req, res) => {
    try {
        const { firstName, lastName, passYear, enrollmentNo, studentEmail, studentPass } = req.body;
        console.log(firstName, lastName, passYear, enrollmentNo, studentEmail, studentPass);
        const newUser = new studentModel({
            firstName,
            lastName,
            enrollmentNo,
            passYear,
            studentEmail,
            studentPass
        })
        await newUser.save();
        res.status(201).json({ message: "Successfully Reg" })
    }
    catch {
        res.status(500).json({ message: "Error encountered" })
    }
})



app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})

