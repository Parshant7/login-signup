import mongoose from "mongoose";
import User from "../models/User.js";
import Product from "../models/Product.js";
import { hash, compare } from "bcrypt";
import {
  messages,
  responseStatus,
  statusCode,
} from "../core/constant/constant.js";

import jwt from "jsonwebtoken";


// controller when user register
export const signupController = async (req, res) => {
  try {
    req.body.password = await hash(req.body.password, 10);
    const userEmail = await User.findOne({
      email: req.body.email,
    });
    
    // if mailId already exists
    if (userEmail ) {
      return res.status(statusCode.Bad_request).json({
        message: messages.userExists,
        Response: responseStatus.failure,
      });
    }

    await User.create(req.body);

    res
      .status(statusCode.Created)
      .json({ message: messages.register, Response: responseStatus.success });
  } catch (error) {
    console.log(error.message,"error");
    res.status(statusCode.Bad_request).json({
      messages: messages.registerError,
      ResponseStatus: responseStatus.failure,
    });
  }
};

// controller for login
export const loginController = async (req, res) => {
  try {
    const UsersData = await User.findOne({
      email: req.body.email,
    });

    // if users email doesnot exists return error
    if (!UsersData ) {
      return res.status(statusCode.Bad_request).json({
        message: messages.unauthorizedEmail,
        ResponseStatus: responseStatus.failure,
      });
    }

    const userId = UsersData._id.toHexString();

    // comparing user password for authoriztion
    const BoolPass = await compare(req.body.password, UsersData.password);

    // if correct password allow login and create jwt token
    if (BoolPass === true) {

      const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: "24h",
      });
    
      return res.status(statusCode.Created).json({
        message: messages.loginSuccess,
        ResponseStatus: responseStatus.success,
        jwToken: token,
      });
    }

    // if wrong password throw error
    else {
      return res.status(statusCode.Unauthorized).json({
        message: messages.UnauthorizedPassword,
        ResponseStatus: responseStatus.failure,
      });
    }
  } catch (error) {
    console.log(error.message,"error");
    res.status(statusCode.Bad_request).json({
      messages: messages.loginError,
      ResponseStatus: responseStatus.failure,
    });
  }
};

// controller when user register
export const addProductController = async (req, res) => {
  try {
    if(!req.file){
      return res.status(statusCode.Bad_request).json({
        messages: messages.uploadfileError,
        ResponseStatus: responseStatus.failure,
      });
    }

    console.log(req.body);
    
    const imageDetails = {
        content: req.body.content,
        price: req.body.price,
    };

      
    imageDetails.image = req.file.originalname;
    console.log("images details ", imageDetails);

    await Product.create(req.body);

    res
      .status(statusCode.Created)
      .json({ message: messages.productAdded, Response: responseStatus.success });

  } catch (error) {
    console.log(error.message,"error");
    res.status(statusCode.Bad_request).json({
      messages: messages.productAddedError,
      ResponseStatus: responseStatus.failure,
    });
  }
};


export const likeProductController =  async (req, res) => {
  try {

    const userId = new mongoose.Types.ObjectId(req.userId);
    const productId = req.body.productId;
    const product = await Product.findById(productId);

    if(product){
      var isLiked = product.likes.includes(userId);
      var option = isLiked? "$pull" : "$addToSet";
      
      let updatedProduct = await Product.findByIdAndUpdate(productId, {[option]: {likes: userId}}, {new: true});

      //if disliked then remove dislike automatically
      console.log("user id ", userId)
      console.log("req.user id ", req.userId)

      if(product.dislikes.includes(userId)){
        updatedProduct = await Product.findByIdAndUpdate(productId, {["$pull"]: {dislikes: userId}}, {new: true}); 
      }
      
      res.status(statusCode.Created).json({
        messages: isLiked? messages.likeRemoved : messages.likeAdded,
        ResponseStatus: responseStatus.failure,
        data: {product: updatedProduct}
      });

    }else{
      res.status(statusCode.Not_Found).json({
        messages: messages.productExistFailure,
        ResponseStatus: responseStatus.failure,
      });
    }

  } catch (error) {
    console.log(error.message,"error");
    res.status(statusCode.Bad_request).json({
      messages: messages.productAddedError,
      ResponseStatus: responseStatus.failure,
    });

  }
};


export const dislikeProductController =  async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const productId = req.body.productId;
    const product = await Product.findById(productId);

    if(product){
      var isDisliked = product.dislikes.includes(userId);
      var option = isDisliked? "$pull" : "$addToSet";
      let updatedProduct = await Product.findByIdAndUpdate(productId, {[option]: {dislikes: userId}}, {new: true});
      
      //if clicked on like then dislike automatically
      if(product.likes.includes(userId)){
        updatedProduct = await Product.findByIdAndUpdate(productId, {["$pull"]: {likes: userId}}, {new: true}); 
      }

      res.status(statusCode.Created).json({
        messages: isDisliked? messages.dislikeRemoved : messages.dislikeAdded,
        ResponseStatus: responseStatus.failure,
        data: {product: updatedProduct}
      });

    }

  } catch (error) {
    console.log(error.message,"error");
    res.status(statusCode.Bad_request).json({
      messages: messages.productAddedError,
      ResponseStatus: responseStatus.failure,
    });

  }
};

export const getProductsController =  async (req, res) => {
  try {

    const products = await Product.find();  

    res.status(statusCode.Ok).json({
      messages: messages.productGetSuccess,
      ResponseStatus: responseStatus.success,
      data: {products}
    });

  } catch (error) {
    console.log(error.message,"error");
    res.status(statusCode.Bad_request).json({
      messages: messages.productGetFailure,
      ResponseStatus: responseStatus.failure,
    });

  }
};