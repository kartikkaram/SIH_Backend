import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { Error_Handler } from './middlewares/Errors.middlewares.js';
import { clerkMiddleware } from '@clerk/express';
import { athleteRouter } from './routes/athleteRoutes.js';
import { adminRouter } from './routes/adminRoutes.js';
import { testRouter } from './routes/testRoutes.js';


const app=express()
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));



app.use(express.static("public"));
app.use(cookieParser())
app.use("/api/v1/athlete", athleteRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/test", testRouter)


app.use(Error_Handler)
export default app

