
var AuthModuleExport = {};
const jwt = require('jsonwebtoken');
const config = require('../config/config');

AuthModuleExport.Authenticate = (req,res,next) =>{
    user = req.body.username;
    token = jwt.sign({username: user },config.tokenSecure,{ expiresIn: 60 });
    console.log(token);

    var decoded = jwt.decode(token);
    console.log(decoded.username); 
    res.send(token);
};


module.exports = AuthModuleExport;