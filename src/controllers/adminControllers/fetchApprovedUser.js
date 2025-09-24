import { ApiResponse } from "../../utils/apiResponse.js";
import { AsyncHandler } from "../../utils/asyncHandler.js";
import { Test } from "../../models/test.models.js";

export const fetchApprovedUser = AsyncHandler(async (req, res) => {
  try {
    const approvedUsers = await Test.find({
      adminApproved: "approved",
    }).populate("userId");

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Approved users fetched successfully",
          approvedUsers
        )
      );
  } catch (err) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          err.message || "Error while fetching approved users"
        )
      );
  }
});
