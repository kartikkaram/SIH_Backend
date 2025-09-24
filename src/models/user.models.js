import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    imageUrl:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
    },
    sport:{
        type: String,
        enum: ["Athletics", "Boxing", "Wrestling", "Hockey", "Badminton", "Shooting"],
    },
    region:{
        type: String,
        enum: ["North", "South", "East", "West"],
    },
    age: {
        type: Number,
        default: null,
    },
    location: {
        type: Object,
        default: {},
    },
    heightCm: {
        type: Number,
        default: null,
    },
    weightKg: {
        type: Number,
        default: null,
    },
},{
    timestamps:true
})

export default mongoose.model("User", userSchema);