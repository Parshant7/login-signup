import { body } from "express-validator";

/* Validation during registration */

export const registrationValidation = [

  body("name")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Enter name")
    .bail()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name cannot contain number or special characters")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Name must have atleast 2 characters")
    .bail(),

  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Enter Email")
    .bail()
    .matches(/^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
    .withMessage("Please Enter Valid Email")
    .bail(),
];


export const passwordValidation = [
  
  body("password")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Enter Password")
    .bail()
    .isLength({ min: 4 })
    .withMessage("Password must have atleast 4 characters ")
    .bail(),

  body("confirmPassword")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Enter confirmPassword")
    .bail()
    .custom(async (value, { req }) => {
      if (value != req.body.password) {
        throw new Error("Password and Confirm password must be same");
      }
    }),
];


/* validation during signup */

export const loginValidation = [

 body("email")
 .trim()
 .not()
 .isEmpty()
 .withMessage("Enter Email")
 .bail()
 .matches(/^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
 .withMessage("Please Enter Valid Email")
 .bail(),

body("password")
.not()
.isEmpty()
.trim()
.withMessage("Enter Password")
.bail()
.isLength({ min: 4 })
.withMessage("Password must have atleast 4 characters ")

]
