import { Router } from 'express';
const router = Router();

import {
    addProductController,
    getProductsController, 
    likeProductController,
    dislikeProductController
}   from '../../controllers/productController.js';

import { jwtAuthenticationMiddleware } from '../../middlewares/jwtAuthorization.js'
import { productvalidation, productIdvalidation } from '../../middlewares/productValidation.js';
import {validateExpressValidatorResult} from '../../helpers/valiadtionError.js';

import  upload  from '../../middlewares/multerUpload.js';


router.use(jwtAuthenticationMiddleware)

router.get('/', getProductsController);

router.post('/addProduct', upload, productvalidation, validateExpressValidatorResult, addProductController);

router.put('/likeProduct',productIdvalidation,validateExpressValidatorResult, likeProductController);

router.put('/dislikeProduct',productIdvalidation, validateExpressValidatorResult, dislikeProductController);


export default router;  