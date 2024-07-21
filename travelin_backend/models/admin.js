import mongoose, { version } from 'mongoose'

const adminSchema = new mongoose.Schema({
    email: { type: String, trim: true },
    password: { type: String, trim: true }
},{versionKey:false})

const adminModel = mongoose.model("admin", adminSchema)

export default adminModel