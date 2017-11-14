/**
 * userService.js 
 * This file contains the logic for User functions in the app
 **/

var User = require('../models/User');

var UserModuleExport = {};

UserModuleExport.GetUsers = (req,res, next) =>{
    //console.log(req.username);
    User.find({})
    .select('-_id username')
    .exec(function(err, data){
        if(err){
            res.status(404).json({});
        }else{
            res.status(200).json(data);
        }
    });
};

module.exports = UserModuleExport;