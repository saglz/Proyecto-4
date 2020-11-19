const response = require('../../network/response');

function controllerCompany(req, res, next) {
    let { nit, name, phone, email, address, cities_id } = req.body;
    if (!nit || !name || !phone || !email || !address || !cities_id) {
        response.error(req, res, 'Parametros de la petición mal escritos o incompletos', 400, 'Error parametros malos[controllerUpdateOrder]');
    } else {
        next();
    }
}

module.exports = {
    controllerCompany
};