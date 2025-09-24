import  User  from "../../models/user.models.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { AsyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";

export const updateAthleteById = AsyncHandler(async (req, res) => {
  const athleteId = req.params.id;
  if (!athleteId) throw new ApiError(400, "Athlete ID is required");

  const { name, sport, region, age, heightCm, weightKg, location } = req.body;

  const updateData = {};
  if (name) updateData.name = name;
  if (sport) updateData.sport = sport;
  if (region) updateData.region = region;
  if (age) updateData.age = age;
  if (heightCm) updateData.heightCm = heightCm;
  if (weightKg) updateData.weightKg = weightKg;
  if (location) updateData.location = location;

  const athlete = await User.findByIdAndUpdate(athleteId, updateData, { new: true });

  if (!athlete) throw new ApiError(404, "Athlete not found");

  res.status(200).json(
    new ApiResponse(200, "Athlete updated successfully", { athlete })
  );
});
