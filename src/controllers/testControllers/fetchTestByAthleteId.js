import Test from "../../models/test.models.js";
import User from "../../models/user.models.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { AsyncHandler } from "../../utils/asyncHandler.js";



export const fetchAllTests=AsyncHandler(async (req,res)=>{
     const { userId } = getAuth(req)
     const user=await User.findOne({clerkId:userId})
    const allTests=await Test.find({userId:user._id})
    .populate("userId", "username")
    .populate("approvedByAdmin", "name")

    if(!allTests){
        throw new ApiError(404, "approved users not found")
    }

    res
    .json(new ApiResponse(200, "all tests", allTests))
})