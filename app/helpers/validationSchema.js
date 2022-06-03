const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

exports.signUpBodyValidation = (body) => {
  const schema = joi.object({
    name: joi.string().label('name'),
    email: joi.string().email().required().label('email'),
    password: passwordComplexity().required().label('password'),
  });
  return schema.validate(body);
};

exports.loginBodyValidation = (body) => {
  const schema = joi.object({
    email: joi.string().email().required().label('email'),
    password: joi.string().required().label('password'),
  });
  return schema.validate(body);
};

exports.refreshTokenBodyValidation = (body) => {
  const schema = joi.object({
    refreshToken: joi.string().required().label('refreshToken'),
  });
  return schema.validate(body);
};
