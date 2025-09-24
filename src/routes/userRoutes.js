import express from "express";
import { clerkWebhook } from "../controllers/userControllers/clerk.controller";


const userRouter = express.Router();

userRouter.post("/clerk", clerkWebhook )


export {userRouter}
