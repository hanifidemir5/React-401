import Joi from "joi";

export const ProductSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(5).required(),
  price: Joi.number().required(),
  photos: Joi.string().custom((value, helpers) => {
    try {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed)) {
        return helpers.message("Photos must be an array.");
      }
      parsed.forEach((photo, index) => {
        const urlPattern = /^(https?:\/\/[^\s]+)$/;
        if (!urlPattern.test(photo)) {
          return helpers.message(`Invalid URL in photos at index ${index}`);
        }
      });
      return value;
    } catch (e) {
      return helpers.message("Photos must be a valid JSON array.");
    }
  }),
});

export default ProductSchema;
