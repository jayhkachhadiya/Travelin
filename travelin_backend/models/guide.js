import mongoose from 'mongoose'

const guideSchema = new mongoose.Schema({
    imageUrl: { type: String, require: true, trim: true },
    name: { type: String, require: true, trim: true },
    designation: { type: String, require: true, trim: true }
}, { versionKey: false })

const guideModel = mongoose.model("guide", guideSchema)

export default guideModel 