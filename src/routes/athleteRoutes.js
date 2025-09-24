import express from "express";
import { fetchAthleteById } from "../controllers/athletesControllers/fetchAthleteById.js";
import { updateAthleteById } from "../controllers/athletesControllers/updateAthlete.js";
import { clerkWebhook } from "../controllers/userControllers/clerk.controller.js";
import { fetchAthletes } from "../controllers/athletesControllers/fetchAthletes.js";


const athleteRouter = express.Router();

athleteRouter.post("/clerk", express.raw({ type: 'application/json' }),clerkWebhook )
athleteRouter.get("/:id", fetchAthleteById )
athleteRouter.get("/", fetchAthletes )
athleteRouter.patch("/:id", updateAthleteById )


export {athleteRouter}
