import {
    messages,
    responseStatus,
    statusCode,
  } from "../core/constant/constant.js";
  
import { validationResult } from "express-validator";
// display express validator errors 
export const validateExpressValidatorResult = (req, res, next) => {

    const errors = validationResult(req)    
    console.log(errors,'errors');     

    if (!errors.isEmpty()) {
        console.log("errr");
        return res.status(400).json(
            { 
                messages: messages.fieldsError,
                ResponseStatus: responseStatus.failure,
                errors: errors.array() 
            });
    }

    next();
}

