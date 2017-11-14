/**
 * User.js 
 * This file contains the User model definition and configuration using the ODM Mongoose
 **/



var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    email: String,
    password: String
});

mongoose.model('Users', UserSchema);

module.exports = mongoose.model('Users');