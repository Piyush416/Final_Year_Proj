import express from 'express';
import 'dotenv/config'
import {ApiResponse} from "./Utils/ApiResponse.js";


const app = express();
const port = process.env.PORT || 3001;

app.get("/",(req,res) =>{
    res.json(new ApiResponse(200,"Server is Up and Running"))
})

app.listen(port, () => console.log(`Server app listening on port ${port}!`));