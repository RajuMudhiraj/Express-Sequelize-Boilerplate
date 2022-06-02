const joi = require('joi');
const password_complexity = require('joi-password-complexity');

exports.sign_up_body_validation = (body) => {
    const schema = joi.object({
        name: joi.string().label("name"),
        email: joi.string().email().required().label("email"),
        password: password_complexity().required().label("password")
    });
    return schema.validate(body);
};

exports.login_body_validation = (body) => {
    const schema = joi.object({
        email: joi.string().email().required().label("email"),
        password: joi.string().required().label("password")
    });
    return schema.validate(body);
}


exports.refresh_token_body_validation = (body) => {
    const schema = joi.object({
        refresh_token: joi.string().required().label("refresh_token"),
    });
    return schema.validate(body);
}