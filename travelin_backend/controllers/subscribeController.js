import subscribeModel from "../models/subscribe.js";
import transporter from "../config/emailConfig.js";

class subscribeController {
    static postEmail = async (req, res) => {
        const { email } = req.body
        try {
            if (email) {
                const data = new subscribeModel({
                    email: email
                })
                await data.save();
                const savedEmail = await subscribeModel.findOne({ email: email })
                console.log(savedEmail)
                const info = {
                    from: process.env.EMAIL_FROM,
                    to: savedEmail.email,
                    subject: "Welcome Aboard! Your Ticket to Exclusive Travel Deals 🌍",
                    text: "Embark on your next adventure with exclusive travel deals tailored just for you!"
                }
                await transporter.sendMail(info)
                return res.json({
                    status: 200,
                    message: "data send success"
                })
            } else {
                return res.json({
                    status: 400,
                    message: "all field are required"
                })
            }
        } catch (error) {
            console.log(error)
            return res.json({
                status: 500,
                message: "internal server error"
            })
        }
    }

    static getEmail = async (req, res) => {
        try {
            const data = await subscribeModel.find()
            return res.json(data)
        } catch (error) {
            return res.json({
                status: 500,
                message: "internal server error"
            })
        }
    }

    static deleteEmail = async (req, res) => {
        try {
            const { id } = req.params
            const data = await subscribeModel.findById(id)
            console.log(data)
            if (data) {
                await subscribeModel.findOneAndDelete(data._id, { id })
                return res.json({
                    status: 200,
                    message: 'record delete success'
                })
            } else {
                return res.json({
                    status: 404,
                    message: "record not found"
                })
            }
        } catch (error) {
            return res.json({
                status: 500,
                message: "internal server error"
            })
        }
    }
}

export default subscribeController