const userRouter = require('express').Router();
const schema = require('../middlewares/schema');
const validateTokenNewPassword = require('../middlewares/tokenValidateChangePassword');
const { registerSchema, loginSchema, sendEmailSchema, validatePassword } = require('../schemas/user.schema');
const { 
    register,
    login,
    logout,
    forgotPassword,
    newPassword,
    getUserById,
    putUser,
    verify
} = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');

userRouter.post('/register',  schema(registerSchema), register);
userRouter.post('/login', schema(loginSchema),login);
userRouter.post('/logout', logout );
userRouter.post('/forgot-password', schema(sendEmailSchema), forgotPassword );
userRouter.post('/new-password/:token', validateTokenNewPassword, schema(validatePassword),newPassword );

userRouter.get('/verify', verify);

userRouter.get('/user', verifyToken, getUserById);
userRouter.put('/user', verifyToken, putUser);

module.exports = userRouter;