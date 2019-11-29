const Joi=require('joi')

const booksPostschema = {
    title: Joi.string()
      .min(3)
      .max(36)
      .required(),
    isbn: Joi.string()
      .min(3)
      .max(36)
      .required(),
    author: Joi.string()
      .min(3)
      .max(36)
      .required(),
    author_id: Joi.string()
      .min(3)
      .max(15)
      .required(),
    publish_date: Joi.string()
      .min(3)
      .max(15)
      .required()
  };
  module.exports.booksPostschema=booksPostschema

  const booksPutSchema = {
    title: Joi.string()
      .min(3)
      .max(36)
      .required(),
    isbn: Joi.string()
      .min(3)
      .max(36)
      .required()
  };

  module.exports.booksPutSchema=booksPutSchema