import Joi from 'joi'

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "in"] } }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')),
    password_confirmation: Joi.string().pattern(new RegExp('^[a-zA-z0-9]{5,30}$')),
})
export default userSchema