const response = require('../../network/response');

function controllerUsers(req, res, next) {
    let { user_id, username, password, name, lastName, email, profileAdmin } = req.body;
    console.log(user_id);
    console.log(username);
    console.log(password);
    console.log(name);
    console.log(lastName);
    console.log(email);
    console.log(profileAdmin);
    if (!user_id || !username || !password || !name || !lastName || !email || !profileAdmin) {
        response.error(req, res, 'Parametros de la petición mal escritos o incompletos', 400, 'Error parametros malos[controller User]');
    } else {
        next();
    }
}

function controllerLogin(req, res, next) {
    let { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json('Información incompleta o petición mal formulada');
    } else {
        next();
    }
}

module.exports = {
    controllerUsers,
    controllerLogin
};