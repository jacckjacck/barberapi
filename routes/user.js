const userRouter = require('express').Router();
var userService = require('../services/userService');
const authMiddleware = require('../helpers/authMiddleware');

userRouter.get("/",authMiddleware,
    userService.GetUsers
);

userRouter.get("/:username", authMiddleware,
    userService.GetByUserName
);

userRouter.post('/', 
    userService.AddUser
);

module.exports = userRouter;