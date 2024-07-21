import detailDestModel from '../models/detailDest.js'
import packModel from '../models/package.js'
class detailDestController {
    static insertDetail = async (req, res) => {
        try {
            const imageUrl = req.file.path
            const packId = req.params.id

            const description = req.body.description
            const day = req.body.day
            const maxPeople = req.body.maxPeople
            const minAge = req.body.minAge
            const date = req.body.date
            const data = await packModel.findById(packId) 


            if (imageUrl && description && day && maxPeople && minAge && date) {
                const doc = new detailDestModel({
                    imageUrl: data.imageUrl,
                    name: data.name,
                    description: description,
                    day: day, 
                    maxPeople: maxPeople,
                    minAge: minAge,
                    date: date,
                    price: data.price,
                })
                console.log(doc)
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
        } catch (error) {
            return res.json({
                status: 500,
                message: "internal server error"
            })
        }
    }

    static getDetailById = async (req, res) => {
        try {
            const id = req.params.id
            const data = await detailDestModel.findById(id)
            return res.json({
                status: 200,
                message: "data show success"
            })
        } catch (error) {
            return res.json({
                status: 500,
                message: "internal server error"
            })
        }
    }

    static getDetail = async (req, res) => {
        try {
            const data = await detailDestModel.find()
            console.log(data)
            return res.json(data)
        } catch (error) {
            return res.json({
                status: 500,
                message: "internal server error"
            })
        }
    }


}
export default detailDestController