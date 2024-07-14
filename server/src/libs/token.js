const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const generateJWT = (user) => {

    const token = jwt.sign({ id: user.id }, SECRET_KEY, {
        expiresIn: '30d'
    });

    return token;

};


const tokenNewPassword = (user) => {

    const token = jwt.sign({ id: user.id }, SECRET_KEY, {
        expiresIn: '15m'
    });

    return token;

};

module.exports = {
    generateJWT,
    tokenNewPassword
};