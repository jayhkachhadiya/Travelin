import Joi from 'joi'

const contactSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'in'] } }).required(),
    phone: Joi.number().required(),
    message: Joi.string().required(),
})

export default contactSchema