const jwt = require('jsonwebtoken');
const response = require('../network/response');
let is_admin = "";
require('dotenv').config();

const { SECRET } = process.env;

const createToken = async(req, res, payload) => {
    try {

        const token = await jwt.sign(payload, SECRET);
        is_admin = payload.profileAdmin;
        response.success(req, res, { token, is_admin }, 200);
    } catch (error) {
        response.error(req, res, "No se pudo generar token", 401, error);
    }
}

/* const validateToken = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verification = await jwt.verify(token, SECRET);
        req.token_info = verification;
        next();
    } catch (error) {
        response.error(req, res, "token no válido", 401, error);
    }
} */

function validateUser(req, res, next) {
    try {
        if (req.token_info.profileAdmin == 1) {
            next()
        } else {
            response.error(req, res, "Sin autorización - No eres admin", 401, 'Token no contiene permisos de admin[ValidateUser]');
        };
    } catch (error) {
        console.log(error);
    }
}

const validateToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verification = jwt.verify(token, SECRET);
        req.token_info = "";
        req.token_info = verification;
        next();

    } catch (error) {
        response.error(req, res, "token no válido", 401, error);
    }
}

module.exports = {
    validateToken,
    validateUser,
    createToken
}