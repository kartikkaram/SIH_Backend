import { ApiResponse } from "../../utils/apiResponse.js";
import { AsyncHandler } from "../../utils/asyncHandler.js";
import { Test } from "../../models/test.models.js";

export const fetchUnApprovedUser = AsyncHandler(async (req, res) => {
  try {
    const unapprovedUsers = await Test.find({
      adminApproved: "pending",
    }).populate("userId");

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Unapproved users fetched successfully",
          unapprovedUsers
        )
      );
  } catch (err) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          err.message || "Error while fetching unapproved users"
        )
      );
  }
});
