import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true, trim: true },
    title: { type: String, require: true, trim: true },
    heading: { type: String, require: true, trim: true },
    blog: { type: String, required: true, trim: true }
}, { versionKey: false })

const sliderModel = mongoose.model("slider", sliderSchema)

export default sliderModel