import bookModel from "../models/booking.js"
import packModel from "../models/package.js";

class bookingController {
    static postDetail = async (req, res) => {
        const { fullname, document, age, bordingPoint, mobile, email, gender, members, pfullname, pmobile, pgender, page } = req.body
        const packageId = req.params.id
        const data = await packModel.findById(packageId)
        const userId = req.user.id;
        try {
            if (packageId === data.id) {
                if (mobile && email && fullname && age && gender && bordingPoint && members) {
                    // const newPassanger = ({
                    //     pfullname: pfullname,
                    //     pmobile: pmobile,
                    //     pgender: pgender,
                    //     page: page
                    // })
                    // console.log(newPassanger)
                    const doc = new bookModel({
                        userId: userId,
                        packageId: data.id,
                        fullname: fullname,
                        mobile: mobile,
                        gender: gender,
                        age: age,
                        email: email,
                        bordingPoint: bordingPoint,
                        paymentId: "1a2s3s4564sdas1d3a16541",
                        members: members,
                    })
                    // console.log(doc)
                    await doc.save()
                    return res.json({
                        status: 200,
                        message: "detail submited successfully"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "all field are required"
                    })
                }
            } else {
                return res.josn({
                    status: 400,
                    message: "invalid packageId"
                })
            }
        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "internal server error"
            })
        }
    }

    static getDetail = async (req, res) => {
        try {
            const data = await bookModel.find()
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
            const id = req.params.id
            const data = await bookModel.findById(id)
            if (data) {
                await bookModel.findByIdAndDelete(id, { data })
                return res.json({ 
                    status: 200,
                    message: "data deleted successfully"
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

        // const updateDetail = await bookModel.findByIdAndUpdate(
        //     membersId,
        //     { $push: { myArrayField: member } },
        //     { new: true }
        // )
        // console.log(packageId)
        // const { pfullname, pmobile, pgender, page } = Array.isArray(req.body.member) && req.body.member.length > 0 ? req.body.member[0] : {};
        // const { pfullname, pmobile, pgender, page } = req.body.member

    }
}
export default bookingController