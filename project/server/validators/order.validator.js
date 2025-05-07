import Joi from 'joi';

export const orderValidator = (data) => {
  const schema = Joi.object({
    items: Joi.array().min(1).required()
      .messages({
        'array.min': 'Order must contain at least one item',
        'array.empty': 'Order items are required',
      }),
    shippingAddress: Joi.object({
      address: Joi.string().required()
        .messages({
          'string.empty': 'Address is required',
        }),
      city: Joi.string().required()
        .messages({
          'string.empty': 'City is required',
        }),
      postalCode: Joi.string().required()
        .messages({
          'string.empty': 'Postal code is required',
        }),
      country: Joi.string().required()
        .messages({
          'string.empty': 'Country is required',
        }),
    }).required()
      .messages({
        'object.base': 'Shipping address is required',
      }),
    paymentMethod: Joi.string().required()
      .messages({
        'string.empty': 'Payment method is required',
      }),
  });

  return schema.validate(data);
};