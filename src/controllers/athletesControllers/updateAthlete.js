import { User } from "../../models/user.models.js";
import { ApiResponse } from "../../utils/apiResponse";
import { AsyncHandler } from "../../utils/asyncHandler";

export const fetchAthleteById = AsyncHandler(async (req, res) => {
  try {
    const { name, sport, region, age, heightCm, weightKg, location } = req.body;
    const athleteId = req.params.id;

    if (!athleteId) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Athlete ID is required"));
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (sport) updateData.sport = sport;
    if (region) updateData.region = region;
    if (age) updateData.age = age;
    if (heightCm) updateData.heightCm = heightCm;
    if (weightKg) updateData.weightKg = weightKg;
    if (location) updateData.location = location;

    const athlete = await User.findByIdAndUpdate(athleteId, updateData, {
      new: true,
    });

    if (!athlete) {
      return res.status(404).json(new ApiResponse(404, "Athlete not found"));
    }

    res.status(200).json(
      new ApiResponse(200, "Athlete updated successfully", {
        athlete,
      })
    );
  } catch (err) {
    return res
      .status(500)
      .json(
        new ApiResponse(500, err.message || "Error while updating athlete")
      );
  }
});
