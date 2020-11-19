const sequelize = require('../../store/conexionMysql');
const querys = require('../../store/querys');
const response = require('../../network/response');

/* ---------------------------------------------READ REGION -----------------------------------------------------*/
const readRegion = async(req, res) => {

    let readCont = await querys.selectAll(req, res, 'region');

    if (!!readCont) {
        response.success(req, res, { readCont }, 200);
    } else {
        response.error(req, res, 'Error leyendo los contactos', 400, 'Error leyendo contactos[getContacts]');
    }
};

/* ---------------------------------------------READ COUNTRIES -----------------------------------------------------*/
const readCountries = async(req, res) => {
    const paramsId = req.params.id;
    let readCont = await querys.selectDataById(req, res, 'countries AS c INNER JOIN region As r ON c.region_id = r.region_id', 'c.name', 'c.region_id', paramsId);

    if (!!readCont) {
        response.success(req, res, { readCont }, 200);
    } else {
        response.error(req, res, 'Error leyendo los contactos', 400, 'Error leyendo contactos[getContacts]');
    }
};

/* ---------------------------------------------READ CITIES -----------------------------------------------------*/
const readCities = async(req, res) => {
    const paramsId = req.params.id;
    let readCont = await querys.selectDataById(req, res, 'cities AS ct INNER JOIN countries As c ON ct.countries_id = c.countries_id', 'ct.name', 'ct.countries_id', paramsId);

    if (!!readCont) {
        response.success(req, res, { readCont }, 200);
    } else {
        response.error(req, res, 'Error leyendo los contactos', 400, 'Error leyendo contactos[getContacts]');
    }
};

module.exports = {
    readRegion,
    readCountries,
    readCities
}