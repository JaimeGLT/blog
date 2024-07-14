const userRouter = require('express').Router();
const validateTokenNewPassword = require('../middlewares/tokenValidateChangePassword');
const { 
    register,
    login,
    logout,
    forgotPassword,
    newPassword,
    getUserById,
    putUser,
} = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout );
userRouter.post('/forgot-password', forgotPassword );
userRouter.post('/new-password/:token', validateTokenNewPassword, newPassword );

userRouter.get('/user', verifyToken, getUserById);
userRouter.put('/user', verifyToken, putUser);

module.exports = userRouter;