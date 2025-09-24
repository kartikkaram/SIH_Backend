import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  imageUrl:{
    type:String
  }
},{
  timestamps:true
});

export default mongoose.model("Admin", adminSchema);
