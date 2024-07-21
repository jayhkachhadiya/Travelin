import mongoose, { Schema } from "mongoose";

// const memberSchema = new mongoose.Schema({
// }, { versionKey: false })

const bookSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    packageId: { type: Schema.Types.ObjectId, ref: 'packageId' },
    status: { type: String, enum: ['panding', 'confirm', 'cancelled', 'onhold', 'refunded'], default: "panding" },
    fullname: { type: String, trim: true },
    mobile: { type: Number, trim: true },
    gender: { type: String, trim:true },
    age: { type: Number, trim: true },
    email: { type: String, required: true, trim: true },
    bordingPoint: { type: String, trim: true },
    paymentId: { type: String, required: true, trim: true },
    members: [
        {
            pfullname: { type: String, trim: true },
            pmobile: { type: Number, trim: true },
            pgender: { type: String, trim:true },
            page: { type: Number, trim: true },
        }
    ],
}, { versionKey: false, timestamps: true }) 


const bookModel = mongoose.model("booking", bookSchema)

export default bookModel