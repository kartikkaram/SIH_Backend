import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  testType: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
  },
  cloudinaryPublicId: {
    type: String,
  },
  durationSec: {
    type: Number,
  },
  sizeBytes: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["pending", "scoring", "scored"],
    default: "pending",
  },
  aiScore: {
    type: Number,
    default: null,
  },
  aiDetails: {
    type: Object,
    default: {},
  },
  adminApproved: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  approvedByAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    default: null,
  },
  adminNotes: {
    type: String,
    default: "",
  },
},{
  timestamps:true
});

export default mongoose.model("Test", testSchema);
