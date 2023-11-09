import { Router } from 'express';
const router = Router();

import {
    signupController, 
    loginController,
    addProductController,
    getProductsController, 
    likeProductController,
    dislikeProductController
}   from '../controllers/userController.js';

import  {registrationValidation, loginValidation, passwordValidation}  from '../middlewares/UserValidation.js';
import { jwtAuthenticationMiddleware } from '../middlewares/jwtAuthorization.js'
import { productvalidation } from '../middlewares/productValidation.js';
import {validateExpressValidatorResult} from '../helpers/valiadtionError.js';

import  upload  from '../middlewares/multerUpload.js';



router.post('/login',loginValidation,validateExpressValidatorResult,loginController);

router.post('/signup',registrationValidation, passwordValidation, validateExpressValidatorResult,signupController);

router.post('/addProduct',jwtAuthenticationMiddleware, upload, productvalidation, validateExpressValidatorResult,  addProductController);

router.put('/likeProduct', jwtAuthenticationMiddleware, likeProductController);

router.put('/dislikeProduct', jwtAuthenticationMiddleware, dislikeProductController);

router.get('/getProduct', jwtAuthenticationMiddleware, getProductsController);


router.get('/login',(req, res)=>{
    res.render("login");
})

router.get('/signup',(req, res)=>{
    res.render("signup");
})

// router.get('/home', jwtAuthenticationMiddleware, getProductsController);

export default router;