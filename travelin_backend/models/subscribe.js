import mongoose from "mongoose";

const subscribeSchema = new mongoose.Schema({
    email: { type: String, require: true, trim: true }
}, { versionKey: false })

const subscribeModel = mongoose.model("subscribe", subscribeSchema)

export default subscribeModel