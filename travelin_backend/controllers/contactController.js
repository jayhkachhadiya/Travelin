import contactModel from "../models/contact.js";
import contactSchema from "../validation/contact_schema.js";
class contactController {
    static postDetail = async (req, res) => {
        // const validationResult = await contactSchema.validateAsync(req.body)
        // console.log(validationResult)
        try {
            const { firstname, lastname, email, phone, message } = req.body
            if (firstname && lastname && email && phone && message) {
                const detail = new contactModel({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    phone: phone,
                    message: message
                })
                await detail.save()
                return res.json({ 
                    status: 200,
                    message: "detail send successfully"
                })
            } else {
                return res.json({ 
                    status: 499,
                    message: "all field are required"
                })
            }
        } catch (error) {
            return res.json({
                status: 500,
                messaege: "internal server error"
            })
        }
    }

    static getDetail = async (req, res) => {
        try {
            const data = await contactModel.find()
            return res.json(data)
        } catch (error) { 
            return res.json({
                status: 500,
                messaege: "internal server error"
            })
        }
    }

    static softDelete = async (req, res) => {
        try {
            const contactId = req.params.id;
            const contact = await contactModel.findById(contactId);
            if (contact) { 
                await contactModel.findByIdAndUpdate(contactId, { isDeleted: true });
                return res.json({
                    status: 200,
                    messaege: "record soft deleted successfully"
                })
            }
            else {
                return res.json({
                    status: 404,
                    messaege: "contact not found"
                })
            }
        } catch (error) {
            console.error(error);
            return res.json({
                status: 500,
                messaege: "internal server error"
            })

        }
    }
}
export default contactController