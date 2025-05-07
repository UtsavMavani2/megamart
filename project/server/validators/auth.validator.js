import Joi from 'joi';

export const registerValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required()
      .messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters',
        'string.max': 'Name cannot exceed 50 characters',
      }),
    email: Joi.string().email().required()
      .messages({
        'string.empty': 'Email is required',
        'string.email': 'Please provide a valid email',
      }),
    password: Joi.string().min(6).required()
      .messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters',
      }),
  });

  return schema.validate(data);
};

export const loginValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required()
      .messages({
        'string.empty': 'Email is required',
        'string.email': 'Please provide a valid email',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'Password is required',
      }),
  });

  return schema.validate(data);
};