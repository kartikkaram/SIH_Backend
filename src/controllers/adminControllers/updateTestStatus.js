import Test from "../../models/test.models";
import { ApiError } from "../../utils/apiError";
import { ApiResponse } from "../../utils/apiResponse";
import { AsyncHandler } from "../../utils/asyncHandler";



export const updateTestStatus = AsyncHandler(async (req, res) => {
  const { testId, status } = req.body;

  if (!testId || !status) {
    throw new ApiError(400, "testId or status missing");
  }

  if (!["pending", "approved", "rejected"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const updatedTest = await Test.findByIdAndUpdate(
    testId,
    { adminApproved: status },
    { new: true }
  );

  if (!updatedTest) {
    throw new ApiError(404, "Test not found or status not updated");
  }

  res.json(new ApiResponse(200, "Status updated", updatedTest));
});
