import guideModel from "../models/guide.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

class guideController {
    static postDetail = async (req, res) => {
        try {
            const fileData = req.files[0];
            const cloudinaryResponse = await uploadOnCloudinary(fileData);
        const imageUrl = cloudinaryResponse.secure_url;
            // const imageUrl = req.file.path
            const name = req.body.name
            const designation = req.body.designation
            const data = await guideModel.findOne({ name: name })
            console.log(data)
            if (data) {
                return res.json({
                    status: 409,
                    message: "record already exists"
                })
            } else {
                if (name && designation && imageUrl) {
                    try {
                        const doc = new guideModel({
                            imageUrl: imageUrl,
                            name: name,
                            designation: designation,
                        })
                        console.log(doc)
                        await doc.save()
                        return res.json({
                            status: 200,
                            message: "insert success"
                        })
                    } catch (error) {
                        console.log(error)
                        return res.json({
                            status: 404,
                            message: "failed to add guide"
                        })
                    }
                } else {
                    return res.json({
                        status: 409,
                        message: "all field are require"
                    })
                }
            }
        } catch (error) {
            return res.json({
                status: 500,
                message: "Internal server error"
            })
        }
    }

    static getDetail = async (req, res) => {
        try {
            const data = await guideModel.find()
            return res.json(data);
        } catch (error) {
            return res.json({
                status: 500,
                message: "internal server error"
            })
        }
    }

    static deleteDetail = async (req, res) => {
        try {
            const { id } = req.params
            const data = await guideModel.findById(id);
            console.log(data)
            if (data) {
                console.log(req.params)
                await guideModel.findOneAndDelete(data._id, { id })
                return res.json({
                    status: 200,
                    message: "record deleted successfully"
                })
            } else {
                return res.json({
                    status: 404,
                    message: "guide not found"
                })
            }
        } catch (error) {
            return res.json({
                status: 500,
                message: "Internal server error"
            })
        }
    }
}

export default guideController