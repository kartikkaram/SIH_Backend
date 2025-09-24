import { getAuth } from "@clerk/express";
import Test from "../../models/test.models";
import User from "../../models/user.models";
import { ApiError } from "../../utils/apiError";
import { AsyncHandler } from "../../utils/asyncHandler";
import { uploadToCloudinary } from "../../utils/couldinaryUpload";
import { getAiScore } from "../../utils/getAIScore";






export const uploadTest=AsyncHandler(async (req, res)=>{
    const {type}=req.body
     const { userId } = getAuth(req)
      if (!userId) {
    throw new ApiError(401, "Unauthorized user");
  }
  const user=await User.findOne({clerkId:userId})
    if (!req.files || req.files.length === 0) {
    throw new ApiError(400, "No video files uploaded");
  }
   for (const file of req.files) {
    // Upload each video to Cloudinary
    const cloudResult = await uploadToCloudinary(file.path);

    // Get AI score
    const aiScore = await getAiScore(cloudResult.secure_url);

    //  Save to DB
    const test = await Test.create({
      userId: user._id,
      testType:type,
      videoUrl: cloudResult.secure_url,
      cloudinaryPublicId: cloudResult.public_id,
      durationSec:cloudResult.duration,
      status:"scored",
      sizeBytes:cloudResult.bytes,

      aiScore,
      status: "scored",
    });

    uploadedTests.push(test);
  }
})