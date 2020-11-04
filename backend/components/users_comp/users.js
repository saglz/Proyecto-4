const connMongoose = require('../../store/conexion');
/* const searchCompany = require('../../utils'); */

const users = connMongoose.model('users', {
    idU: Number,
    fullName: String,
    email: String,
    position: String,
    userName: String,
    password: String,
});

const createUsers = async(req, res, next) => {
    let { idU, fullName, email, position, userName, password } = req.body;
    if (!idU || !fullName || !email || !position || !userName || !password) return res.status(400).json('parametros mal enviados');
    /* searchCompany(req, res, nit); */
    await users.findOne({ idU: idU })
        .then((result) => {
            if (result != null) {
                return res.status(404).json('El contacto ya existe');
            } else {
                let objAddUser = {
                    idU,
                    fullName,
                    email,
                    position,
                    userName,
                    password
                }
                console.log(objAddUser);
                const addUser = new users(objAddUser);
                addUser.save();
                res.status(200).json('Usuario agregado');
            }
        })
        .catch((err) => {
            console.error(err);
        });

};

const readUsers = async(req, res, next) => {
    users.find()
        .then((result) => {
            res.status(200).json({ result });
        })
        .catch((err) => {
            console.error(err);
        });
};

const updateUsers = async(req, res, next) => {
    let { idU, fullName, email, position, userName, password } = req.body;
    if (!idU || !fullName || !email || !position || !userName || !password) return res.status(400).json('parametros mal enviados');
    users.findOne({ idU: idU })
        .then((result) => {
            if (result) {
                result.idU = idU;
                result.fullName = fullName;
                result.email = email;
                result.position = position;
                result.userName = userName;
                result.password = password;
                result.save();
                res.status(200).json('Actualización correcta');
            } else {
                return res.status(400).json('No se puede actualizar esta compañia');
            }
        })
        .catch((err) => {
            console.error(err);
        });
};

const deleteUsers = async(req, res, next) => {
    let { idU } = req.body;
    if (!idU) return res.status(400).json('parametros mal enviados');
    users.deleteOne({ idU: idU })
        .then((result) => {
            console.log(result);
            res.status(200).json('Contacto eliminado correctamente');
        })
        .catch((err) => {
            console.error(err);
        });
};

module.exports = {
    createUsers,
    readUsers,
    updateUsers,
    deleteUsers
}