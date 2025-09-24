import { Test } from "../../models/test.models.js";
import { User } from "../../models/user.models.js";
import { ApiResponse } from "../../utils/apiResponse";
import { AsyncHandler } from "../../utils/asyncHandler";

export const fetchAthleteById = AsyncHandler(async (req, res) => {
  try {
    const athleteId = req.params.id;

    if (!athleteId) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Athlete ID is required"));
    }

    const athlete = await User.findById(athleteId);

    if (!athlete) {
      return res.status(404).json(new ApiResponse(404, "Athlete not found"));
    }

    const recentTestData = await Test.find({ userId: athleteId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(
      new ApiResponse(200, "Athlete fetched successfully", {
        athlete,
        recentTests: recentTestData || null,
      })
    );
  } catch (err) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          err.message || "Error while fetching athlete by ID"
        )
      );
  }
});
