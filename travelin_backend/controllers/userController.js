import userModel from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from "../config/emailConfig.js";
import userService from "../servicer/user.js";
// import userSchema from "../validation/user_schema.js";

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

class userController {
    static userRegister = async (req, res) => {
        // const validationResult = await userSchema.validateAsync(req.body)
        const { name, email, password, password_confirmation } = req.body
        // const findOne = (findPattern)=>{
        //     return new Promise(async(resolve, reject) => {
        //         try{
        //           const savedUser = await userModel.findOne(findPattern) 
        //           resolve(savedUser);
        //         }catch(e){
        //           console.log(e)
        //           reject()
        //         }
        //       })
        // }
        // const findPattern = { email: email };
        // findOne(findPattern).then((data)=>{
        //     console.log(data)
        // }).catch((e)=>{
        //     console.log(e.message);
        // })

        // userService.findOne(findPattern).then((data) => {
        //     console.log(data)
        // }).catch((e) => {
        //     console.log(e.message);
        // })
        try {
            const user = await userModel.findOne({ email: email })

            // const user=await userModel.findOne({
            //     $or:[{email}]
            // })

            if (user) {
                return res.json({ status: 409, message: "email is already registered" })
            } else {
                if (name && email && password && password_confirmation) {
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(password, salt)
                    const otp = generateOTP();
                    const expiryTime = Date.now() + 5 * 60 * 1000;// 5min
                    if (password === password_confirmation) {
                        try {
                            const doc = new userModel({
                                name: name,
                                email: email,
                                password: hashPassword,
                                OTP: otp,
                                expireIn: expiryTime
                            })
                            console.log(doc)
                            await doc.save()
                            const savedUser = await userModel.findOne({ email: email })
                            const info = {
                                from: process.env.EMAIL_FROM,
                                to: savedUser.email,
                                subject: 'Registration OTP',
                                text: `Your OTP for registration is: ${otp}`,
                            }
                            await transporter.sendMail(info);
                            return res.json({
                                status: 200,
                                message: "message sent success"
                            })
                        } catch (error) {
                            return res.json({
                                status: 401,
                                message: "unable to register"
                            })
                        }
                    } else {
                        return res.json({
                            status: 403,
                            message: "Password does not match"
                        })
                    }
                } else {
                    return res.json({
                        status: 499,
                        message: "all field are required"
                    })
                }
            }
        } catch (error) {
            return res.json({
                status: 500,
                message: "internal server error"
            })
        }
    };

    static loggedUser = async (req, res) => {
        res.send({ "user": req.user })
    };

    static getUser = async (req, res) => {
        try {
            const data = await userModel.find()
            return res.json(data)
        } catch (error) {
            return res.json({
                status: 500,
                message: "internal server error"
            })
        }
    };

    static deleteUser = async (req, res) => {
        try {
            const userId = req.params.id
            const data = await userModel.findById(userId)
            console.log(data)
            if (data) {
                await userModel.findByIdAndDelete(userId, { data }).then((data) => {
                    console.log(data)
                }).catch((e) => {
                    console.log(e)
                })
                return res.json({
                    status: 200,
                    message: "record deleted successfully"
                })
            } else {
                return res.json({
                    status: 404,
                    message: "reconrd not found"
                })
            }
        } catch (error) {
            return res.json({
                status: 500,
                message: "internal server error"
            })
        }
    };
    static userOtp = async (req, res) => {
        try {
            const { email, OTP } = req.body
            const user = await userModel.findOne({ email: email })
            if (user) {
                // console.log(user.OTP)
                // console.log(OTP)
                if (user.OTP != OTP) {
                    return res.json({
                        status: 400,
                        message: "invelid OTP"
                    })
                }
                else if (new Date() > user.expireIn) {//isme > aata he 
                    return res.json({
                        status: 400,
                        message: "otp is expire"
                    })
                }
                else {
                    const secret = user._id + process.env.JWT_SECRATE_KEY
                    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '5d' })
                    // console.log(user._id)
                    await userModel.findOneAndUpdate(user, { isVerify: true });
                    return res.json({
                        status: 201,
                        message: "registration success",
                        "token": token
                    })
                }
            } else {
                return res.json({
                    status: 400,
                    message: "Invalid data"
                });
            }
        } catch (error) {
            return res.json({
                status: 500,
                message: "unable to register"
            })
        }
    };
    static resendOTP = async (req, res) => {
        try {
            const { email } = req.body;
            const user = await userModel.findOne({ email: email })
            const newOTP = generateOTP();
            console.log(newOTP)
            if (user) {
                if (email === user.email) {
                    const resend = await transporter.sendMail({
                        from: process.env.EMAIL_FROM,
                        to: email,
                        subject: 'Registration OTP',
                        text: `NEW OTP for registration is: ${newOTP}`,
                    })
                    // await transporter.sendMail(resend)
                    await userModel.findByIdAndUpdate(user._id, { $set: { OTP: newOTP } }).then((res) => {
                        console.log(res)
                    }).catch((e) => {
                        console.log(e)
                    })
                    return res.json({
                        status: 200,
                        message: 'OTP resent successfully'
                    })
                }
                else {
                    return res.json({
                        status: 400,
                        message: "invelid email"
                    })
                }
            } else {
                return res.json({
                    status: 400,
                    message: "user does not register"
                })
            }
        } catch (error) {
            return res.json({
                status: 500,
                message: "internal server error"
            })
        }
    };
    static userLogin = async (req, res) => {
        const { email, password } = req.body
        console.log(req.body)
        const user = await userModel.findOne({ email: email })
        try {
            if (user.isVerify == true) {
                if (email && password) {
                    const isMatch = await bcrypt.compare(password, user.password)
                    if (user.email === email && isMatch) {
                        // const user = await userModel.findOne({ email: email })
                        // console.log(user)
                        const secret = process.env.JWT_SECRATE_KEY
                        const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '5d' })
                        return res.json({
                            status: 200,
                            message: "login success",
                            "token": token
                        })
                    }
                    else {
                        return res.json({
                            status: 404,
                            message: "user not found"
                        })
                    }
                } else {
                    return res.json({
                        status: 499,
                        message: "all fields are required"
                    })
                }
            } else {
                return res.json({
                    status: 499,
                    message: "please complate the registration"
                })
            }
        } catch (error) {
            return res.json({
                status: 500,
                message: "unable to login"
            })
        }
    };

    static changeUserPassword = async (req, res) => {
        try {
            const { password, password_confirmation } = req.body

            if (password && password_confirmation) {
                if (password !== password_confirmation) {
                    return res.send({
                        status: 401,//unauthorise user 
                        message: "password and confirm does not match"
                    })
                } else {
                    const salt = await bcrypt.genSalt(10)
                    const newHashPassword = await bcrypt.hash(password, salt)
                    await userModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
                    return res.send({
                        status: 200,
                        message: "password change success"
                    })
                }
            } else {
                return res.send({
                    status: 400,
                    message: "all fields are required"
                })
            }
        } catch (error) {
            res.status({
                status: 500,
                message: 'internal server error'
            })
        }
    };

    static sendUserPasswordResetEmail = async (req, res) => {
        try {
            const { email } = req.body
            if (email) {
                const user = await userModel.findOne({ email: email })
                console.log(user.password)
                const oldPassword = user.password
                if (user) {
                    const secret = user._id + process.env.JWT_SECRATE_KEY
                    const token = jwt.sign({ userID: user._id }, secret, { expiresIn: "15m" })
                    //this link is fronted link
                    const link = `http://localhost:3001/api/user/reset/${user._id}/${token}`
                    //send mail 
                    let info = await transporter.sendMail({
                        from: process.env.EMAIL_FROM,
                        to: user.email,
                        subject: "travelin - Password Reset Link",
                        html: `<a href=${link}>Click Here</a> to Reset Your Password`
                    })
                    return res.json({
                        status: 200,
                        message: "password reset email sent... please check your email"
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "email does not found"
                    })
                }
            } else {
                return res.json({
                    status: 499,
                    message: "Email field is required"
                })
            }
        } catch (error) {
            res.json({
                status: 500,
                message: "inertnal server error"
            })
        }
    }
}


export default userController