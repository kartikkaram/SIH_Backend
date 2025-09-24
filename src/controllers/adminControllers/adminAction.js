import { Test } from "../../models/test.models.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { AsyncHandler } from "../../utils/asyncHandler";

export const adminAction = AsyncHandler(async (req, res) => {
  try {
    const { testId, adminApproved, adminNotes } = req.body;
    const adminId = req.user?._id;

    if (!testId) {
      return res.status(400).json(
        new ApiResponse(400, "Test Not Found")
      );
    }

    const updatedTest = await Test.findByIdAndUpdate(
      testId,
      {
        adminApproved,
        adminNotes,
        approvedByAdmin: adminId,
      },
      { new: true }
    );

    if (!updatedTest) {
      return res.status(404).json(
        new ApiResponse(404, "Test Not Found")
      );
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Test Updated Successfully", updatedTest));
  } catch (err) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          err.message || "Error while updating test"
        )
      );
  }
});
