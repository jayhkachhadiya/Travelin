
import Razorpay from 'razorpay';
import crypto from 'crypto'
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;
import paymentModel from '../models/payment.js';

const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY
});
class paymentController {
    static createOrder = async (req, res) => {
        try {
            const amount = req.body.amount * 100
            const options = {
                amount: amount,
                currency: 'INR',
                receipt: 'razorUser@gmail.com'
            }
            const order = await razorpayInstance.orders.create(options)
            res.json({
                status: 200,
                success: true,
                order
            })
        } catch (error) {
            res.json({
                status: 500,
                message: "internal server error"
            })
        }
    }

    static paymentVerification = async (req, res) => {
        try {
            console.log(req.body)

            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

            const body = razorpay_order_id + "|" + razorpay_payment_id

            const expectedSignature = crypto
                .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
                .update(body.toString())
                .digest('hex');
            // console.log("sig received", razorpay_signature)
            // console.log("sig generated", expectedSignature)

            const isAuthentic = expectedSignature === razorpay_signature

            if (isAuthentic) {
                await paymentModel.create({
                    razorpay_order_id,
                    razorpay_payment_id,
                    razorpay_signature
                })
                res.redirect(`http://localhost:3001/confirm?referance=${razorpay_payment_id}`)
            } else {
                res.json({
                    status: 200,
                    message: "payment success"
                })
            }
        } catch (error) {
            res.json({
                status: 500,
                message: "internal server error"
            })
        }
    }

    static getKey = async (req, res) => {
        try {
            res.json({
                key: process.env.RAZORPAY_ID_KEY
            })
        } catch (error) {
            res.json({
                status: 500,
                message: "internal server error"
            })
        }
    }
}

export default paymentController