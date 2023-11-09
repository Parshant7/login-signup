///////////////////////////////////////////////
//  DATE: 4 nov 2023
//  Created By: Parshant Khichi (parshantkhichi@gmail.com)
///////////////////////////////////////////////

import express from 'express';
import connectDb from './config/dbConnection.js';
import cookieParser from 'cookie-parser';

import authRoute from './routes/authRoutes.js';
import productRoute from './routes/productRoutes.js';
import {jwtAuthenticationMiddleware} from './middlewares/jwtAuthorization.js'

const app = express();
const PORT = 3000;

app.use(express.static('public')); 
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

connectDb();

app.use('/auth',authRoute);
app.use('/products',productRoute);

app.listen(PORT, ()=>{
    console.log("server is listening...");
});
