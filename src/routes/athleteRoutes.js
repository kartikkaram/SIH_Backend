import express from "express";
import { fetchAthleteById } from "../controllers/athletesControllers/fetchAthleteById.js";
import { updateAthleteById } from "../controllers/athletesControllers/updateAthlete.js";
import { clerkWebhook } from "../controllers/userControllers/clerk.controller.js";


const athleteRouter = express.Router();

athleteRouter.post("/clerk", clerkWebhook )
athleteRouter.get("/:id", fetchAthleteById )
athleteRouter.get("/", fetchAthleteById )
athleteRouter.patch("/:id", updateAthleteById )


export {athleteRouter}
