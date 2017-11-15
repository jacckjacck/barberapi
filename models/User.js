/**
 * User.js 
 * This file contains the User model definition and configuration using the ODM Mongoose
 **/



var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    email: { 
        type: String, 
        required: true,
        lowercase: true,
        unique: true,
        validate:{
            validator: function(email){
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
            },
            message: '{VALUE} is not a valid email'
        }
    },
    password: String
});

mongoose.model('Users', UserSchema);

module.exports = mongoose.model('Users');