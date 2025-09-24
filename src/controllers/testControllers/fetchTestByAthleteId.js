import Test from "../../models/test.models";
import User from "../../models/user.models";
import { ApiError } from "../../utils/apiError";
import { ApiResponse } from "../../utils/apiResponse";
import { AsyncHandler } from "../../utils/asyncHandler";



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