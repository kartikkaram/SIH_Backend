import express from "express";




const testRouter = express.Router();


router.post(
  "/upload",
  upload.array("video",5)
);

export {testRouter}