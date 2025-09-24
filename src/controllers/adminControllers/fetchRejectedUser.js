import { ApiResponse } from "../../utils/apiResponse.js";
import { AsyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import Test  from "../../models/test.models.js";

export const fetchRejectedUser = AsyncHandler(async (req, res) => {
  const rejectedUsers = await Test.find({ adminApproved: "rejected" })
    .populate("userId")
    .populate("approvedByAdmin", "name");

  if (!rejectedUsers || rejectedUsers.length === 0) {
    throw new ApiError(404, "No rejected users found");
  }

  res.status(200).json(
    new ApiResponse(200, "Rejected users fetched successfully", rejectedUsers)
  );
});
