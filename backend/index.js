import express, { urlencoded } from 'express';
import cors from "cors"
import 'dotenv/config'
import {ApiResponse} from "./Utils/ApiResponse.js";
import {connectToDatabase} from "./DBConnection/dbConnection.js";
import authRoutes from "./Routes/Auth.js";
import UtilityRoutes from "./Routes/UtilityRoutes.js";
const app = express();
const port = process.env.PORT || 3001;
const baseUrl = "/api/"

connectToDatabase().
then(() => "Database Connection Successfully")
    .catch(() => "Something went Wrong!")


app.use(express.json());
app.use(cors())
app.use(urlencoded({extended:true}))
//Routes

app.use(baseUrl,authRoutes)
app.use(baseUrl,UtilityRoutes)


app.get("/",(req,res) =>{
    res.json(new ApiResponse(200,"Server is Up and Running"))
})

app.listen(port, () => console.log(`Server app listening on port ${port}!`));