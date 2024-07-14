const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const { User } = require('../../db');

const validateTokenNewPassword = (req, res, next) => {

    const { token } = req.params;
    if(!token) return res.status(401).send({ msg: 'Acceso denegado' });

    jwt.verify(token, SECRET_KEY, async (err, user) => {
        if(err) return res.status(400).send({ msg: 'Token no válido' });
        
        const userFound = await User.findOne({ where: { id: user.id, token } });
        if(!userFound) return res.status(404).send({ msg: 'Usuario no encontrado, acceso denegado' });

        req.userPass = user;

        next();
    });

};

module.exports = validateTokenNewPassword;