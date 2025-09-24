import { Test } from "../../models/test.models.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { AsyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";


export const getTestById = AsyncHandler(async (req, res) => {
  const testId = req.params.id;
  if (!testId) throw new ApiError(400, "Test ID is required");

  const test = await Test.findById(testId)
    .populate("userId", "username ")
    .populate("approvedByAdmin", "name");

  if (!test) throw new ApiError(404, "Test not found");

  res.status(200).json(new ApiResponse(200, "Test fetched successfully", test));
});
