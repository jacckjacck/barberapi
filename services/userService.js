/**
 * userService.js 
 * This file contains the logic for User functions in the app
 **/

const bcrypt = require('bcrypt'); 
var User = require('../models/User');


var UserModuleExport = {};

UserModuleExport.GetUsers = (req, res, next) => {
    //console.log(req.username);
    User.find({})
    .select('-_id name')
    .exec(function(err, data){
        if(err){
            return res.status(404).json({});
        }else{
            return res.status(200).json(data);
        }
    });
};

UserModuleExport.AddUser = (req, res, next) => {


    bcrypt.hash(req.body.password,10, function(err, hashedpass){
        if(err){
            return res.status(500).json({error: 'There was and error hashing the password'});
        }else{
            var newUser = new User({
                name: req.body.username,
                password: hashedpass
            });

            newUser.save(function(err, user, numRows){
                if(err){
                    return res.status(500).json({error: err.message});
                }else{
                    return res.status(200).json({message: 'the user '+user.name+' has been created successfully.'});
                }
            });
        }
    });
};

UserModuleExport.GetUser = (req, res, next) =>{
    User
    .findOne({name : req.username})
    .select('password')
    .exec(function(err,data){
        if(err){
            return res.status(404).json({});
        }else{
            return data;
        }
    });
}

module.exports = UserModuleExport;