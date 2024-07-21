import adminModel from "../models/admin.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()


const emai = process.env.EMAIL
const pass = process.env.PASSWORD

class adminController {
    static saveDetail = async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(pass, salt)
            const data = new adminModel({
                email: emai,
                password: hashPassword
            })
            await data.save()
            res.json({
                status: 200,
                message: "detailed save sucessfully"
            })
        } catch (error) {
            res.json({
                status: 500,
                message: "internal server error"
            })
        }
    }

    static loginAdmin = async (req, res) => {
        try {
            const { email, password } = req.body
            const doc = await adminModel.findOne({ email: emai })
            // console.log(doc.email)
            if (email && password) {
                if (email === doc.email) {
                    const match = await bcrypt.compare(password, doc.password)
                    if (match) {
                        const secret = process.env.JWT_SECRATE_KEY
                        const token = jwt.sign({ adminId: doc._id }, secret, { expiresIn: "2d" })
                        console.log(token)
                        res.json({
                            status: 200,
                            message: "login success", 
                            token: token
                        })
                    } else {
                        res.json({
                            status: 400,
                            message: "incorrect password"
                        })
                    }
                } else {
                    res.json({
                        status: 400,
                        message: "email is not found"
                    })
                }
            } else {
                res.json({
                    status: 499,
                    message: "all field are required"
                })
            }
        } catch (error) {
            res.json({
                status: 500,
                message: "internal server error"
            })
        }
    }
}

export default adminController