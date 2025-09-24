import { Test } from "../../models/test.models.js";
import { User } from "../../models/user.models.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { AsyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";

export const fetchAthleteById = AsyncHandler(async (req, res) => {
  const athleteId = req.params.id;
  if (!athleteId) throw new ApiError(400, "Athlete ID is required");

  const athlete = await User.findById(athleteId);
  if (!athlete) throw new ApiError(404, "Athlete not found");

  const recentTestData = await Test.find({ userId: athleteId })
    .sort({ createdAt: -1 })
    .limit(5);

  res.status(200).json(
    new ApiResponse(200, "Athlete fetched successfully", {
      athlete,
      recentTests: recentTestData.length ? recentTestData : null,
    })
  );
});
