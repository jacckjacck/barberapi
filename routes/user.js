const userRouter = require('express').Router();
var userService = require('../services/userService');
const authMiddleware = require('../helpers/authMiddleware');

userRouter.get("/",authMiddleware,
    userService.GetUsers
);

module.exports = userRouter;