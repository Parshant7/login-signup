import jwt from 'jsonwebtoken';
import User from '../models/User.js';

import {
    messages,
    responseStatus,
    statusCode,
  } from "../core/constant/constant.js";

export const jwtAuthenticationMiddleware = async (req, res, next) => {

    try {
        console.log(" here is the cookies", req.cookies);
        
        let jwt_token = req.cookies.jwt;

        // let jwt_token = req.headers.authorization;

        // // check if token exists or not and that too in bearer part also
        // if (!jwt_token || !req.headers.authorization.startsWith('Bearer')) {
        //     return res.status(statusCode.Bad_request).json({ Message: messages.TokenError, ResponseStatus: responseStatus.failure })
        // }
        
        // // to have only the token, removing unnecessary bearer part from token
        // jwt_token = (req.headers.authorization).split(' ')[1]

        // verify the token given by user for authentication

        jwt.verify(jwt_token, process.env.JWT_SECRET_KEY, async (err, data) => {
            if (err) {
                return res.status(statusCode.Bad_request).json({ Messages: err.message ,ResponseStatus: responseStatus.failure});
            } else {
                const user = await User.findById(data.userId);
                console.log("user in authentication", user);
                
                // checking the role, only allow admin to add products
                if(req.originalUrl === "/products/addProduct" && user.role !== "admin"){
                    return res.status(statusCode.Unauthorized)
                    .json({ Messages: messages.UnauthorizedUser, ResponseStatus: responseStatus.failure })
                }

                // to use userId in future for manipulation
                req.userId = data.userId;
                next()
            }
        })

    } catch (error) {
        console.log("error in jwtauth ", error.message);
        return res.status(statusCode.Bad_request)
        .json({ Messages: messages.serverError, ResponseStatus: responseStatus.failure })
    }
};
