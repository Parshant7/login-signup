import { Router } from 'express';
const router = Router();

import {
    signupController, 
    loginController,
}   from '../controllers/authController.js';

import  { registrationValidation, loginValidation }  from '../middlewares/UserValidation.js';
import { validateExpressValidatorResult } from '../helpers/valiadtionError.js';


router.post('/login',loginValidation, validateExpressValidatorResult,loginController);

router.post('/signup',registrationValidation, validateExpressValidatorResult,signupController);


router.get('/login',(req, res)=>{
    res.render("login");
})

router.get('/signup',(req, res)=>{
    res.render("signup");
})


export default router;