const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  createUserValidator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().required().email(),
      last_name: Joi.string().min(3).max(30).required(),
      phone: Joi.string().required().alphanum(),
      rol: Joi.string().valid("guest", "admin", "owner").required(),
      description: Joi.string(),
      password: Joi.string().required().min(6),
    }),
  }),
};
