import Test from "../../models/test.models.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { AsyncHandler } from "../../utils/asyncHandler.js";



export const fetchAllTests=AsyncHandler(async (req,res)=>{
    const allTests=await Test.find()
    .populate("userId", "username")
    .populate("approvedByAdmin", "name")

    if(!allTests){
        throw new ApiError(404, "approved users not found")
    }

    res
    .json(new ApiResponse(200, "all tests", allTests))
})