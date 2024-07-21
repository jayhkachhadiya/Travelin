import mongoose from 'mongoose'

const destiSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    place: { type: String, required: true, trim: true }
}, { versionKey: false })

const destiModel = mongoose.model("destination", destiSchema)

export default destiModel 