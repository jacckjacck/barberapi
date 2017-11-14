/**
 * authService.js 
 * This file contains the logic for authentication functions
 **/
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcrypt'); 
var User = require('../models/User');
var AuthModuleExport = {};


AuthModuleExport.Authenticate = (req, res, next) =>{
    User.findOne({name: req.body.username})
    .exec(function(err,data){
        if(err){
            return res.status(404).json({error:'Invalid username and/or password'});
        }else{
            if(data){
                bcrypt.compare(req.body.password, data.password, function(err, result){
                    if(result){
                        //Get information from body request regarding username for future use
                        user = req.body.username;
                                        //Generate a JWT token through sign method, adding the user name to the payload to be encrypted
                        token = jwt.sign({username: user },config.tokenSecure,{ expiresIn: '1h' });
                        return res.status(200).json({ token: token});
                    }else{
                        return res.status(404).json({error:'Invalid username and/or password'});
                    }
                });
            }else{
                return res.status(404).json({error:'Invalid username and/or password'});
            }

        }
    });
};

//Exports the module
module.exports = AuthModuleExport;