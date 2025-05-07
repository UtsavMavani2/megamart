import Joi from 'joi';

export const productValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required()
      .messages({
        'string.empty': 'Product name is required',
        'string.min': 'Product name must be at least 3 characters',
        'string.max': 'Product name cannot exceed 100 characters',
      }),
    description: Joi.string().required()
      .messages({
        'string.empty': 'Product description is required',
      }),
    price: Joi.number().min(0).required()
      .messages({
        'number.base': 'Price must be a number',
        'number.min': 'Price cannot be negative',
        'number.empty': 'Price is required',
      }),
    stock: Joi.number().integer().min(0).required()
      .messages({
        'number.base': 'Stock must be a number',
        'number.integer': 'Stock must be an integer',
        'number.min': 'Stock cannot be negative',
        'number.empty': 'Stock is required',
      }),
    category: Joi.string().required()
      .messages({
        'string.empty': 'Category is required',
      }),
    images: Joi.array().min(1).required()
      .messages({
        'array.min': 'At least one image is required',
        'array.empty': 'Images are required',
      }),
    featured: Joi.boolean(),
  });

  return schema.validate(data);
};

export const reviewValidator = (data) => {
  const schema = Joi.object({
    rating: Joi.number().min(1).max(5).required()
      .messages({
        'number.base': 'Rating must be a number',
        'number.min': 'Rating must be at least 1',
        'number.max': 'Rating cannot exceed 5',
        'number.empty': 'Rating is required',
      }),
    comment: Joi.string().required()
      .messages({
        'string.empty': 'Review comment is required',
      }),
  });

  return schema.validate(data);
};