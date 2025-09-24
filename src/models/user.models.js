import mongoose from mongoose;

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
    email:{
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.model("User", userSchema);