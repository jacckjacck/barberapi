const authRouter = require('express').Router();
var authService = require('../services/authService');


authRouter.post("/",
    authService.Authenticate
);

module.exports = authRouter;