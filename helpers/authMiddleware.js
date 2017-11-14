/**
 * authMiddleware.js 
 * This file contains a middleware that handle Json Web Token authorizations
 **/

 //Json Web Token library
const jwt = require('jsonwebtoken');
//Configuration File
const config = require('../config/config');

module.exports = (req,res,next) => {

    if(!req.headers.authorization){
        return res
        .status(403)
        .send({message:"No token provided."})
    }

    //Get the token from the request headers format: Bearer generated.jwt.token
    var token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, config.tokenSecure,(err,decoded) => {
        if(err){
            return res
            .status(500)
            .send({message: 'failed to authenticate with token', errDetails:err.message })
        }

        //if the token was validated correctly assign the username to the request object for future uses
        //before invoke the next method for continue with the below middlewares
        req.username = decoded.username;
        next();
    });


};