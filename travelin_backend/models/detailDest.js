import mongoose from 'mongoose'

const detailDestSchema =new mongoose.Schema({
    name: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
    description: { type: String, trim: true },
    day: { type: String, trim: true },
    maxPeople: { type: String, trim: true },
    minAge: { type: String, trim: true },
    date: { type: String, trim: true },
    price: { type: Number, trim: true },
}, { versionKey: false })

const detailDestModel =  mongoose.model("detailDest", detailDestSchema)

export default detailDestModel;