const Joi = require("joi");

const authorPostSchema = {
    id: Joi.string()
      .min(3)
      .max(15)
      .required(),
    full_name: Joi.string()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .min(3)
      .max(30)
      .required(),
    gender: Joi.string()
      .min(3)
      .max(10)
      .required(),
    dob: Joi.string()
      .min(3)
      .max(15)
      .required()
  };
  module.exports.authorPostSchema=authorPostSchema

  const authorPutSchema = {
    full_name: Joi.string()
      .min(3)
      .max(20)
      .required(),
    id: Joi.string()
      .min(3)
      .max(20)
      .required()
  };

  module.exports.authorPutSchema=authorPutSchema

  const authorDeleteSchema = {
    id: Joi.string()
      .min(3)
      .max(20)
      .required()
  };

  module.exports.authorDeleteSchema=authorDeleteSchema