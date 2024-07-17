const { User } = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env;
const {generateJWT, tokenNewPassword} = require('../libs/token');
const main = require('../libs/sendCorreo');


const register = async (req, res) => {

    const { username, email, password } = req.body;

    try {
        const userFound = await User.findOne({ where: { email } });
        if(userFound) return res.status(400).send({ msg: 'Ya hay un usuario registrado con ese correo electrónico' });

        const passwordHashed = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: passwordHashed
        });

        newUser.rango = 2;
        await newUser.save();

        return res.status(200).send({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        });

    } catch (error) {
        return res.status(404).send({ msg: error.message });
    }

};

const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        
        const userFound = await User.findOne({ where: { email } });
        if(!userFound) return res.status(401).send({ msg: 'Correo o contraseña incorrectos' });

        const verifyPassword = await bcrypt.compare(password, userFound.password);
        if(!verifyPassword) return res.status(401).send({ msg: 'Correo o contraseña incorrectos' })

        const token = generateJWT(userFound);

        res.cookie('access_token', token, {
            httpOnly: false,
            secure: true,
            sameSite: false,
        });

        return res.status(200).send({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email
        });

    } catch (error) {
        return res.status(404).send({ msg: error.message });
    }

};

const logout = (req, res) => {

    const { access_token } = req.cookies;
    if(!access_token) return res.status(400).send({ msg: 'No hay token, no se puede cerrar sesion' });

    res.cookie('access_token', '', {
        expiresIn: new Date(0),
    });

    return res.status(200).send({ msg: 'Cuenta cerrada exitosamente' });

};

const forgotPassword = async (req ,res) => {

    const { email } = req.body;
    console.log(email, 'asd')
    if(!email) return res.status(400).send({ msg: 'El correo es obligatorio' });

    try {
        const userFound = await User.findOne({ where: { email } });
        if(!userFound) return res.status(404).send({ msg: 'No hay un usuario registrado con ese correo' });

        const token = tokenNewPassword(userFound);

        await main(email, token);

        userFound.token = token;
        await userFound.save();

        return res.status(200).send({ msg: 'Correo enviado' });

    } catch (error) {
        return res.status(404).send({ error: error.message });
    }

};

const newPassword = async (req, res) => {

    const { newPassword, confirmNewPassword } = req.body;
    const { id } = req.userPass;

    if(!newPassword || !confirmNewPassword) return res.status(404).send({ msg: 'Son campos obligatorios' });
    if(newPassword !== confirmNewPassword) return res.status(400).send({ msg: 'Los dos campos deben tener la misma contraseña' });

    try {
        const userFound = await User.findByPk(id);
        if(!userFound) return res.status(400).send({ msg: 'Usuario no encontrado' });

        const newPasswordHashed = await bcrypt.hash(newPassword, 10);

        req.userPass = '';

        userFound.password = newPasswordHashed;
        userFound.token = '';
        await userFound.save();

        return res.status(200).send({ msg: 'Se ha cambiado la contraseña exitosamente' });

    } catch (error) {
        return res.status(404).send({ msg: error.message });
    }

};

const getUserById = async (req, res) => {

    const { id } = req.user;
    if(!id) return res.status(400).send({ msg: 'Usuario no encontrado' });

    try {
        const userFound = await User.findByPk(id);
        if(!userFound) return res.status(404).send({ msg: 'Usuario no encontrado' });

        return res.status(200).send({
            username: userFound.username,
            email: userFound.email
        });

    } catch (error) {
        return res.status(400).send({ msg: error.message })
    }

};

const putUser = async (req, res) => {

    const { id } = req.user;
    const { username, password, newPassword, confirmNewPassword } = req.body;

    try {
        
        const getUserById = await User.findByPk(id);
        if(!getUserById) return res.status(404).send({ msg: 'Usuario no encontrado' });

        if(username && username.length > 3) {
            getUserById.username = username;
            await getUserById.save();
        };

        if(password || newPassword || confirmNewPassword) {
            const verifyPassword = await bcrypt.compare(password, getUserById.password);
            if(!verifyPassword) return res.status(400).send({ msg: 'La contraseña es incorrecta' });

            if(!newPassword || !confirmNewPassword) return res.status(400).send({ msg: 'son campos obligatoroios' });
            if(newPassword !== confirmNewPassword) return res.status(400).send({ msg: 'Las contraseña debe ser iguales' });

            const newPasswordHashed = await bcrypt.hash(newPassword, 10);

            getUserById.password = newPasswordHashed;
            await getUserById.save();
        }

        return res.status(200).send({ msg: 'datos actualizados correctamente' });

    } catch (error) {
        return res.status(400).send({ msg: error.message });
    }

};

const verify = (req, res) => {

    const { access_token } = req.cookies;
    if(!access_token)  return res.status(404).send({ msg: 'No token no autorizacion' });
    console.log('jaime');

    try {
        
        jwt.verify(access_token, SECRET_KEY, async (err, user) => {
            if(err) return res.status(404).send({ msg: 'Token invalido' });
            const userFound = await User.findByPk(user.id);
            if(!userFound) return res.status(404).send({ msg: 'Usuario no encontrado, autorizacion denegada' });
    
            return res.status(200).send({
                id: userFound.id,
                username: userFound.username,
                email: userFound.email
            });
    
        });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }


};

module.exports = {
    register,
    login,
    logout,
    forgotPassword,
    newPassword,
    getUserById,
    putUser,
    verify
}