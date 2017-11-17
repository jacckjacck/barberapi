
const userRouter = require('express').Router();
var userService = require('../services/userService');
const authMiddleware = require('../helpers/authMiddleware');



/**
 * @api {get} /users List all users
 * @apiGroup Users
 * @apiSuccess {Object[]} Users users list
 * @apiSuccess {String} users.name User Name
 * @apiSuccess {String} users.email User Email
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "name" : "John Doe",
 *      "email" : "john.doe@email.com"
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *     {
 *        "err" : "Error Message"
 *     }
 */
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