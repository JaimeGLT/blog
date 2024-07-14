const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const { User } = require('../../db');

const verifyToken = (req, res, next) => {

    const { access_token } = req.cookies;
    if(!access_token) return res.status(401).send({ msg: 'No hay token, autorizacion denegada' });

    jwt.verify(access_token, SECRET_KEY, async (err, user) => {
        if(err) return res.status(404).send({ msg: 'Token no válido' });

        const userFound = await User.findByPk(user.id);
        if(!userFound) return res.status(400).send({ msg: 'Usuario no encontrado' });

        if(userFound.rango !== 2) return res.status(404).send({ msg: 'No tienes permiso para realizar esta accion' });

        req.user = user;

        next();
    });
};

module.exports = verifyToken;