import sliderModel from "../models/slider.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

class sliderController {
    static insertDetail = async (req, res) => {
        try {
            const fileData = req.files[0];
            const cloudinaryResponse = await uploadOnCloudinary(fileData);
        const imageUrl = cloudinaryResponse.secure_url;
            // const imageUrl = req.file.path
            const title = req.body.title
            const heading = req.body.heading
            const blog = req.body.blog

            if (imageUrl && title && heading && blog) {
                const doc = new sliderModel({
                    imageUrl: imageUrl,
                    title: title,
                    heading: heading,
                    blog: blog
                })
                await doc.save()
                res.json({
                    status: 200,
                    message: "record insert success"
                })
            } else {
                return res.json({
                    status: 499,
                    message: 'all field are required'
                })
            }

        } catch (error) {
            console.log(error)
            return res.json({
                status: 500,
                message: 'internal server error'
            })
        }
    }

    static getDetail = async (req, res) => {
        try {
            const data = await sliderModel.find()
            return res.json(data)
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
            const data = await sliderModel.findById(id)
            if (data) {
                await sliderModel.findByIdAndDelete(data._id, { id })
                return res.json({
                    status: 200,
                    message: 'record delered success'
                })
            } else {
                return res.json({
                    status: 404,
                    message: 'record not found'
                })
            }
        } catch (error) {
            return res.json({
                status: 500,
                message: 'internal server error'
            })
        }
    }
}

export default sliderController