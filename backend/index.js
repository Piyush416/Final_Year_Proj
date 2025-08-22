import express, { urlencoded } from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { ApiResponse } from './Utils/ApiResponse.js';
import { connectToDatabase } from './DBConnection/dbConnection.js';
import authRoutes from './Routes/Auth.js';
import ConfigurationRoute from './Routes/ConfigurationRoute.js';
import DiscussionFormRoute from './Routes/DiscussionFormRoute.js';
import OppurtunitesRoute from './Routes/OppurtunitesRoute.js';
import ProfileRoute from './Routes/ProfileRoute.js';
import EventsRoute from './Routes/EventsRoute.js';
import ChatbotRoute from "./Routes/ChatbotRoute.js";
//Cron Schedule
import cron from 'node-cron';
import { syncFromMongo } from './Controllers/ChatbotController.js'


const app = express();
const port = process.env.PORT || 3001;
const baseUrl = '/api';

// ✅ Proper CORS setup
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// ✅ Connect DB
await connectToDatabase()
  .then(() => console.log('✅ Database connected'))
  .catch((err) => {
    console.error('❌ DB connection failed:', err.message);
    process.exit(1);
  });

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// ✅ Routes
app.use(baseUrl, authRoutes);
app.use(baseUrl, ConfigurationRoute);
app.use(baseUrl,DiscussionFormRoute)
app.use(baseUrl, OppurtunitesRoute);
app.use(baseUrl, ProfileRoute);
app.use(baseUrl, EventsRoute);
app.use(baseUrl, ChatbotRoute)

//Cron Schedule
cron.schedule("0 2 * * *",async () => {
    console.log("Cron Job is running at 2 AM");
    try {
        await syncFromMongo()
        console.log("Cron Job is completed")
    }catch (error) {
        console.log("Cron Job is failed",error)
    }
})


app.get('/', (req, res) => {
  res.json(new ApiResponse(200, 'Server is Up and Running'));
});

app.listen(port, () => {
  console.log(`🚀 Server app listening on port ${port}`);
});
