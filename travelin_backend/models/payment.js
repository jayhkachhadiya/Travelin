import mongoose from 'mongoose'


const paySchema = new mongoose.Schema({
    razorpay_order_id: { type: String, required: true },
    razorpay_payment_id: { type: String, required: true },
    razorpay_signature: { type: String, required: true }
})

const paymentModel = mongoose.model("payment", paySchema)

export default paymentModel