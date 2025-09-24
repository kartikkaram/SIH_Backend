import Test from "../../models/test.models";
import { ApiError } from "../../utils/apiError";
import { ApiResponse } from "../../utils/apiResponse";
import { AsyncHandler } from "../../utils/asyncHandler";



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