import express from "express";

import { fetchAthleteById } from "../controllers/athletesControllers/fetchAthleteById.js";
import { fetchTestById } from "../controllers/testControllers/fetchTestById.js";
import { uploadTest } from "../controllers/testControllers/uploadTest.js";
import { upload } from "../middlewares/multer.middlewares.js";

const testRouter = express.Router();

testRouter.get("/athlete/:id", fetchAthleteById );
testRouter.get("/:id", fetchTestById);
testRouter.post(
  "/upload",
  upload.array("video", 5), 
  uploadTest
);

export { testRouter };
