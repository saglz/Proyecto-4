const response = require('../../network/response');

function controllerContacts(req, res, next) {
    let { id, name, lastName, email, position, channel, interest, companies_id } = req.body;
    if (!id || !name || !lastName || !email || !position || !channel || !interest || !companies_id) {
        response.error(req, res, 'Parametros de la petición mal escritos o incompletos', 400, 'Error parametros malos[controllerUpdateOrder]');
    } else {
        next();
    }
}

module.exports = {
    controllerContacts
};