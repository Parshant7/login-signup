import { body } from "express-validator";

/* Validation during registration */

export const productvalidation = [

  // price should not be empty, and should be number
  body("price")
  .not()
  .isEmpty()
  .withMessage("Please enter price")
  .bail()
  .isNumeric()
  .withMessage("Price must be of type number.")
  .bail()
  .matches(/^\d+$/)
  .withMessage("Pricce name can contain numbers only")
  .bail()
  .isLength({ min: 1, max: 999999 })
  .withMessage("Please enter a valid price")
  .bail(),

  // content should not be empty, and should be string
  body("content")
  .not()
  .isEmpty()
  .withMessage("Please enter content")
  .bail()
  .isString()
  .withMessage("Content must be of type string.")
  .bail()
  .trim()
  .not()
  .isEmpty()
  .withMessage("Please enter Product content")
  .bail()
  .isLength({ min: 2, max: 3000 })
  .withMessage("Please enter a content")
  .bail()

];
