const joi = require("joi");

const registerValidation = (data) => {
  const schema = joi.object({
    username: joi.string().min(6).max(299).required(),
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    firstName: joi.string().max(255).required(),
    lastName: joi.string().max(255).required(),
    password: joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = joi.object({
    username: joi.string().max(299).required(),
    password: joi.string().required(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
