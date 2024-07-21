import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    OTP: { type: Number },
    expireIn: { type: String },
    isVerify: { type: Boolean, default: false },
}, { versionKey: false })
const userModel = mongoose.model("user", userSchema)

export default userModel