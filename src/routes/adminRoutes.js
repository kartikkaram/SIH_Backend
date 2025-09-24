import express from "express"
import { fetchAllTests } from "../controllers/adminControllers/fetchAllTests.js"
import { fetchApprovedUsers } from "../controllers/adminControllers/fetchApprovedUsers.js"
import { fetchUnApprovedUser } from "../controllers/adminControllers/fetchUnapprovedUser.js"
import { adminAction } from "../controllers/adminControllers/adminAction.js"


const adminRouter=express.Router()

adminRouter.get("/fetchTests", fetchAllTests)
adminRouter.get("/approvedUsers", fetchApprovedUsers )
adminRouter.get("/unapprovedUsers", fetchUnApprovedUser )
adminRouter.get("/rejectedUsers", fetchApprovedUsers )
adminRouter.patch("/action", adminAction)


export {adminRouter}