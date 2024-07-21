import packModel from "../models/package.js";
import packService from "../servicer/package.js";
import mongoose from "mongoose";
import uploadOnCloudinary from "../utils/cloudinary.js";
const { ObjectId } = mongoose.Types;

class packController {
    static insertPackage = async (req, res) => {
        // const findPattern = { name: name };
        // packService.findOne(findPattern)
        // const { name, destination, description, duration, price } = req.body
        const fileData = req.files[0];
        const cloudinaryResponse = await uploadOnCloudinary(fileData)
        const imageUrl = cloudinaryResponse.secure_url;
        // const imageUrl = req.file.path
        const name = req.body.name
        const destination = req.body.destination
        const description = req.body.description
        const duration = req.body.duration
        const price = req.body.price

        const longDescription = req.body.longDescription
        const day = req.body.day
        const maxPeople = req.body.maxPeople
        const minAge = req.body.minAge
        const date = req.body.date
        const tag = req.body.tag

        const data = await packModel.findOne({ destination: destination })
        // console.log(data)
        try {
            if (data) {
                return res.json({
                    status: 409,
                    message: "record already exists"
                })
            } else {
                if (imageUrl && name && destination && description && duration && price && longDescription && day && maxPeople && minAge && date && tag) {
                    const doc = new packModel({
                        name: name,
                        imageUrl: imageUrl,
                        destination: destination,
                        description: description,
                        duration: duration,
                        price: price,
                        longDescription: longDescription,
                        day: day,
                        maxPeople: maxPeople,
                        minAge: minAge,
                        date: date,
                        tag: tag
                    })
                    await doc.save();
                    return res.json({
                        status: 200,
                        message: "record insert success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "all field are required"
                    })
                }
            }
        } catch (error) {
            return res.json({
                status: 400,
                message: "internal server error"
            })
        }
    }

    static getPackage = async (req, res) => {
        try {
            const data = await packModel.find()
            return res.json(data)
        } catch (error) {
            return res.json({
                status: 500,
                message: "internal server error"
            })
        }
    }

    static getPackageById = async (req, res) => {
        try {
            const id = req.params.id
            const data = await packModel.findById(id)
            return res.json(data)
        } catch (error) {
            return res.json({
                status: 500,
                message: "internal server error"
            })
        }
    }

    static getPackageByTag = async (req, res) => {
        try {
            const tag = req.params.tag
            console.log(tag)
            const data = await packModel.find({ tag: tag });
            return res.json(data)
        } catch (error) {
            return res.json({
                status: 500,
                message: 'internal server error'
            })
        }
    }

    static updatePackage = async (req, res) => {
        try {
            const fileData = req.files[0];
        const cloudinaryResponse = await uploadOnCloudinary(fileData)
        const imageUrl = cloudinaryResponse.secure_url;
            // const imageUrl = req.file.path
            const name = req.body.name
            const destination = req.body.destination
            const description = req.body.description
            const duration = req.body.duration
            const price = req.body.price
            const day = req.body.day
            const date = req.body.date
            const tag = req.body.tag
            const packageId = req.params.id;

            const existingPackage = await packModel.aggregate([
                {
                    $match: {
                        name: name,
                        _id: { $ne: new mongoose.Types.ObjectId(packageId) },
                    }
                }
            ])

            if (existingPackage.length > 0) {
                return res.json({
                    status: 400,
                    message: "name already exists"
                })
            } else {
                await packModel.findByIdAndUpdate(packageId, { name, destination, description, duration, price, imageUrl, day, date, tag })
                return res.json({
                    status: 200,
                    message: "record updated successfully"
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

    static deletePackage = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await packModel.findById(id)
            if (data) {
                await packModel.findByIdAndDelete(data._id, { id })
                return res.json({
                    status: 200,
                    message: "record delete successfully"
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

export default packController

// .then((data) => {
//     // if (data) {
//         console.log("name already",data)
//         return res.json({ status: 200, message: "name already" })
//     // } else {
//         // update code
//     // }
// }).catch((e) => {
//     console.log(e.message);
//     return res.json({
//         status: 500,
//         message: e.message
//     })
// })