import  Test  from "../../models/test.models.js";
import Admin from "../../models/admin.models.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { AsyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/apiError.js";
import { getAuth } from "@clerk/express";


export const adminAction = AsyncHandler(async (req, res) => {
  const { testId, adminApproved, adminNotes } = req.body;
  const { userId } = getAuth(req);

  const admin = await Admin.findOne({ clerkId: userId });
  if (!admin) throw new ApiError(403, "Unauthorized: Admin not found");

  if (!testId) throw new ApiError(400, "Test ID is required");

  const updatedTest = await Test.findByIdAndUpdate(
    testId,
    {
      adminApproved,
      adminNotes,
      approvedByAdmin: admin._id,
    },
    { new: true }
  );

  if (!updatedTest) throw new ApiError(404, "Test not found");

  res.status(200).json(
    new ApiResponse(200, "Test updated successfully", updatedTest)
  );
});