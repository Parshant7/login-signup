import { Router } from 'express';
const router = Router();

import {
    addProductController,
    getProductsController, 
    likeProductController,
    dislikeProductController
}   from '../controllers/productController.js';

import { jwtAuthenticationMiddleware } from '../middlewares/jwtAuthorization.js'
import { productvalidation, productIdvalidation } from '../middlewares/productValidation.js';
import {validateExpressValidatorResult} from '../helpers/valiadtionError.js';

import  upload  from '../middlewares/multerUpload.js';


router.use(jwtAuthenticationMiddleware)

router.get('/', (req, res)=>{
    const payload = {
        name: req.user.name
    }
    res.render("home", payload);
});

export default router;