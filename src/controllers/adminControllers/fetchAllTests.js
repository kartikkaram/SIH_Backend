import Test from "../../models/test.models";
import { ApiError } from "../../utils/apiError";
import { ApiResponse } from "../../utils/apiResponse";
import { AsyncHandler } from "../../utils/asyncHandler";



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