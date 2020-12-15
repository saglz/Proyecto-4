const sequelize = require('../../store/conexionMysql');
const querys = require('../../store/querys');
const response = require('../../network/response');

const jwt = require('jsonwebtoken');
const { SECRET } = process.env;
/* ---------------------------------------------CREATE CONTACTS -----------------------------------------------------*/
const createUsers = async(req, res) => {
    let { user_id, username, password, name, lastName, email, profileAdmin } = req.body;

    let alreadyExists = await querys.selectDataById(req, res, 'users', 'user_id', 'user_id', user_id);

    if (!!alreadyExists) {
        response.error(req, res, 'Ya existe un usuario con esa identificación', 200, 'Error ya existe el id[createUsers]');
    } else {
        let insert = await querys.insert(req, res, 'users', 'user_id, username, password, name, lastName, email, profileAdmin', `${user_id},'${username}','${password}','${name}','${lastName}','${email}',${profileAdmin}`);
        if (!!insert) {
            response.success(req, res, 'Usuario creado con éxito', 201);
        } else {
            response.error(req, res, 'Error insertando contacto', 400, 'Error insertando[createUsers]');
        }
    }
};

/* ---------------------------------------------READ CONTACTS -----------------------------------------------------*/
const readUsers = async(req, res) => {

    let readUsers = await querys.selectData(req, res, 'users', 'user_id, name, lastName, email, profileAdmin');

    if (!!readUsers) {
        response.success(req, res, { readUsers }, 200);
    } else {
        response.error(req, res, 'Error leyendo los usuarios', 400, 'Error leyendo usuarios[getContacts]');
    }
};
/* LOGIN */
const loginUsers = async(req, res) => {
    let { username, password } = req.body;

    let alreadyExists = await querys.selectDataByNameAnd(req, res, 'users', 'username', 'username', username, 'password', password);

    if (alreadyExists !== "") {

        let payload = await querys.selectDataByName(req, res, 'users', 'user_id, username, email, profileAdmin', 'username', username);

        const sendpayload = {
            user_id: payload[0].user_id,
            username: payload[0].username,
            email: payload[0].email,
            profileAdmin: payload[0].profileAdmin
        };

        createToken(req, res, sendpayload);
    } else {
        response.error(req, res, 'Usuario o contraseña invalidos', 400, 'Error en el login,no existen usario o contraseña en la BD');
    }
};

/* ---------------------------------------------UPDATE CONTACTS -----------------------------------------------------*/
const updateUsers = async(req, res) => {
    let { user_id, username, password, name, lastName, email, profileAdmin } = req.body;

    await sequelize.query(`UPDATE users 
    SET username='${username}',password='${password}',name='${name}',lastName='${lastName}',email='${email}',profileAdmin=${profileAdmin}
    WHERE user_id=${user_id}`)
        .then(result => {
            if (result[1] == 0) {
                response.error(req, res, 'Error No se puede actualizar usuarios', 400, 'Error actualizando usuarios[updateUsers]');
            } else {
                response.success(req, res, 'Número de usuarios actualizados: ' + result[0].affectedRows, 200);
            }
        })
        .catch(err => {
            response.error(req, res, 'Error No se puede actualizar usuarios', 400, err);
        });
};

/* ---------------------------------------------DELETE CONTACTS -----------------------------------------------------*/
const deleteUsers = async(req, res) => {
    let { user_id } = req.body;
    if (!user_id) return res.status(400).json('parametros mal enviados');

    let deleteCont = await querys.delete(req, res, 'users', 'user_id', user_id);

    if (!!deleteCont) {
        response.success(req, res, `Usuario eliminado por id: ${user_id}`, 200);
    } else {
        response.error(req, res, 'No se puede eliminar usuario', 400, 'Error eliminando usuario[deleteUsers]');
    };
};

/* --------------------------------------------- METODOS GENERALES -----------------------------------------------------*/
const createToken = (req, res, payload) => {
    try {
        const token = jwt.sign(payload, SECRET);
        response.success(req, res, { token }, 200);
    } catch (error) {
        response.error(req, res, "No se pudo generar token", 401, error);
    }
}

const validateToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verification = jwt.verify(token, SECRET);
        req.token_info = verification;
        next();
    } catch (error) {
        response.error(req, res, "token no válido", 401, error);
    }
}

module.exports = {
    createUsers,
    readUsers,
    updateUsers,
    deleteUsers,
    loginUsers,
    validateToken
}