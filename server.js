const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();
const port = process.env.PORT || 8082;

//Routes
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');



app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/barberapp',{useMongoClient: true});


app.use('/users', userRoute);
app.use('/auth', authRoute);

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.listen(port,() =>{
    console.log("Live on %s", port);
})