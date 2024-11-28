const Joi = require('joi');

const residentSchema = Joi.object({
    name: Joi.object({
        first: Joi.string().required(),
        last: Joi.string().required(),
    }).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
});

exports.validateResident = (req, res, next) => {
    const { error } = residentSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
