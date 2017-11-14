/**
 * authService.js 
 * This file contains the logic for authentication functions
 **/

var AuthModuleExport = {};
const jwt = require('jsonwebtoken');
const config = require('../config/config');

AuthModuleExport.Authenticate = (req,res,next) =>{
    //TODO: CRITICAL! Is necessary to add the logic for authentication from mongodb 

    //Get information from body request regarding username for future use
    user = req.body.username;

    //Generate a JWT token through sign method, adding the user name to the payload to be encrypted
    token = jwt.sign({username: user },config.tokenSecure,{ expiresIn: '1h' });

    return res.send(token);
};

//Exports the module
module.exports = AuthModuleExport;