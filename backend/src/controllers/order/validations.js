import Joi from "joi";

export const validateOrder = (data) => {
  const schema = Joi.object({
    items: Joi.array().items(Joi.string()).min(1).required(),
    address: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(data);
};
