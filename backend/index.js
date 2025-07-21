import express, { urlencoded } from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { ApiResponse } from './Utils/ApiResponse.js';
import { connectToDatabase } from './DBConnection/dbConnection.js';
import authRoutes from './Routes/Auth.js';
import ConfigurationRoute from './Routes/ConfigurationRoute.js';
import DiscussionFormRoute from './Routes/DiscussionFormRoute.js';

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

app.get('/', (req, res) => {
  res.json(new ApiResponse(200, 'Server is Up and Running'));
});

app.listen(port, () => {
  console.log(`🚀 Server app listening on port ${port}`);
});
