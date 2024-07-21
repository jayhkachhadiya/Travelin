import jwt from 'jsonwebtoken'
import userModel from "../models/user.js"

const checkUserAuth = async (req, res, next) => {
    let token
    const { authorization } = req.headers

    if (authorization && authorization.startsWith('Bearer')) {
        try {
            //get token from header
            // console.log(authorization)

            token = authorization.split(' ')[1]

            // console.log(token)
            //verify token
            const { userID } = jwt.verify(token, process.env.JWT_SECRATE_KEY) 
            //get user from token
            req.user = await userModel.findById(userID).select('-password')
            // console.log(req.user._id)
            next()
        } catch (error) {
            res.status(401).send({ "status": "failed", "message": "unauthorised user", "error": error })
        }
    }
    if (!token) {
        res.status(401).send({ "status": "failed", "message": "unauthorised user , no token" })
    }
}
export default checkUserAuth