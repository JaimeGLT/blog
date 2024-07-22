const userRouter = require('express').Router();
const schema = require('../middlewares/schema');
const validateTokenNewPassword = require('../middlewares/tokenValidateChangePassword');
const { registerSchema, loginSchema, sendEmailSchema, validatePassword, putPasswordSchema, putUsernameSchema } = require('../schemas/user.schema');
const { 
    register,
    login,
    logout,
    forgotPassword,
    newPassword,
    getUserById,
    putUsername,
    putPassword,
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
userRouter.put('/user-password', verifyToken, schema(putPasswordSchema), putPassword);
userRouter.put('/user-username', verifyToken, schema(putUsernameSchema), putUsername);

module.exports = userRouter;