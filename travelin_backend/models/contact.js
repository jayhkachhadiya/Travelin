import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    firstname: { type: String,  trim: true },
    lastname: { type: String,  trim: true },
    email: { type: String,  trim: true },
    phone: { type: Number,  trim: true },
    message: { type: String,  trim: true },
    isDeleted: { type: Boolean, default: false },
}, { versionKey: false })
const contactModel = mongoose.model("contact", contactSchema)

export default contactModel; 