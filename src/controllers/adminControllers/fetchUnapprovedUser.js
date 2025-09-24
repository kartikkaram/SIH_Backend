import { ApiResponse } from "../../utils/apiResponse.js";
import { AsyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import Test  from "../../models/test.models.js";

export const fetchUnApprovedUser = AsyncHandler(async (req, res) => {
  const unapprovedUsers = await Test.find({ adminApproved: "pending" })
    .populate("userId")
    .populate("approvedByAdmin", "name");

  if (!unapprovedUsers || unapprovedUsers.length === 0) {
    throw new ApiError(404, "No unapproved users found");
  }

  res.status(200).json(
    new ApiResponse(200, "Unapproved users fetched successfully", unapprovedUsers)
  );
});
