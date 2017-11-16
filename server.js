/**
 * server.js 
 * This file contains the logic for base server configutarion
 **/

 //Load base modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
//Init base variables
const app = express();
const port = process.env.PORT || 8082;

//Load Application Routes
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');


//Assign middlewares
app.use(cors({origin:'http://url', optionsSuccessStatus:200}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use('/users', userRoute);
app.use('/auth', authRoute);

//Init Database Connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/barberapp',{useMongoClient: true});

//Base url
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

//Raise server
app.listen(port,(err) =>{
    if(err){
        throw err;
    }
    console.log("Live on %s", port);
})

module.exports = app;