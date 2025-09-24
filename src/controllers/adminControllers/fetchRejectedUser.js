import { ApiResponse } from "../../utils/apiResponse.js";
import { AsyncHandler } from "../../utils/asyncHandler.js";
import { Test } from "../../models/test.models.js";

export const fetchRejectedUser = AsyncHandler(async (req, res) => {
  try {
    const rejectedUsers = await Test.find({
      adminApproved: "rejected",
    }).populate("userId");

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Rejected users fetched successfully",
          rejectedUsers
        )
      );
  } catch (err) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          err.message || "Error while fetching rejected users"
        )
      );
  }
});
