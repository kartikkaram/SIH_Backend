import Test from "../../models/test.models.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { AsyncHandler } from "../../utils/asyncHandler.js";



export const fetchApprovedUsers=AsyncHandler(async (req,res)=>{
    const approvedUsers=await Test.find({adminApproved:"approved"})
    .populate("userId", "username")
    .populate("approvedByAdmin", "name")

    if(!approvedUsers){
        throw new ApiError(404, "approved users not found")
    }

    res
    .json(new ApiResponse(200, "approved users", approvedUsers))
})