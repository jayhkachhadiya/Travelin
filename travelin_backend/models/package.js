import mongoose from 'mongoose'

const packSchema = new mongoose.Schema({
    name: { type: String, require: true, trim: true },
    imageUrl: { type: String, require: true, trim: true },
    destination: { type: String, require: true, trim: true },
    description: { type: String, require: true, trim: true },
    duration: { type: String, require: true, trim: true },
    price: { type: Number, require: true, trim: true },
    longDescription: { type: String, trim: true },
    day: { type: String, trim: true },
    maxPeople: { type: String, trim: true },
    minAge: { type: String, trim: true },
    date: { type: String, trim: true },
    tag: { type: String, trim: true }

}, { versionKey: false })

const packModel = mongoose.model("package", packSchema)

export default packModel