const sequelize = require('../../store/conexionMysql');
const querys = require('../../store/querys');
const response = require('../../network/response');

/* ---------------------------------------------CREATE REGION -----------------------------------------------------*/
const createRegion = async(req, res) => {
    let { name } = req.body;

    let alreadyExists = await querys.selectDataByName(req, res, 'region', 'name', 'name', name);

    if (!!alreadyExists) {
        response.error(req, res, 'Ya existe una región con ese nombre', 200, 'Error ya existe esta region[createRegion]');
    } else {
        /* let insert = await querys.insert(req, res, 'region', 'region_id, name', `${region_id},'${name}'`); */
        let insert = await querys.insert(req, res, 'region', 'name', `'${name}'`);
        if (!!insert) {
            response.success(req, res, 'Region creada con éxito', 201);
        } else {
            response.error(req, res, 'Error insertando region', 400, 'Error insertando[createRegion]');
        }
    }
};
/* ---------------------------------------------READ REGION -----------------------------------------------------*/
const readRegion = async(req, res) => {

    let readRegionQuery = await querys.selectAll(req, res, 'region');

    if (!!readRegionQuery) {
        response.success(req, res, { readRegionQuery }, 200);
    } else {
        response.error(req, res, 'Error leyendo los contactos', 400, 'Error leyendo contactos[getContacts]');
    }
};

/* ---------------------------------------------UPADATE REGION -----------------------------------------------------*/
const updateRegion = async(req, res) => {
    let { region_id, name } = req.body;

    await sequelize.query(`UPDATE region 
    SET name='${name}'
    WHERE region_id=${region_id}`)
        .then(result => {
            if (result[1] == 0) {
                response.error(req, res, 'No se pudo actualizar la region', 400, 'Error update region[updateRegion]');
            } else {
                response.success(req, res, 'Número de regiones actualizadas: ' + result[0].affectedRows, 200);
            }
        })
        .catch(err => {
            response.error(req, res, 'Error inesperado actualizando region', 400, err);
        });
};

/* ---------------------------------------------DELETE REGION -----------------------------------------------------*/
const deleteRegion = async(req, res) => {
    let { region_id } = req.body;
    if (!region_id) return res.status(400).json('parametros mal enviados');

    let deleteRegion = await querys.delete(req, res, 'region', 'region_id', region_id);

    if (!!deleteRegion) {
        response.success(req, res, `Region eliminada por id: ${region_id}`, 200);
    } else {
        response.error(req, res, 'No se puede eliminar Region', 400, 'Error eliminando region[deleteRegion]');
    }
};
/* -----------------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------CREATE COUNTRIES -----------------------------------------------------*/
const createCountries = async(req, res) => {
    let { name, region_id } = req.body;

    let alreadyExists = await querys.selectDataByName(req, res, 'countries', 'name', 'name', name);

    if (!!alreadyExists) {
        response.error(req, res, 'Ya existe un pais con ese nombre', 200, 'Error ya existe un pais[createRegion]');
    } else {
        let insert = await querys.insert(req, res, 'countries', 'name, region_id', `'${name}',${region_id}`);
        if (!!insert) {
            response.success(req, res, 'Pais creado con éxito', 201);
        } else {
            response.error(req, res, 'Error insertando Pais', 400, 'Error insertando[createCountries]');
        }
    }
};
/* ---------------------------------------------READ COUNTRIES -----------------------------------------------------*/
const readCountries = async(req, res) => {
    const paramsId = req.params.id;
    let readCountriesQuery = await querys.selectDataById(req, res, 'countries AS c INNER JOIN region As r ON c.region_id = r.region_id', 'c.countries_id, c.name', 'c.region_id', paramsId);

    if (!!readCountriesQuery) {
        response.success(req, res, { readCountriesQuery }, 200);
    } else {
        response.error(req, res, 'Error leyendo los paises', 400, 'Error leyendo paises[getCountries]');
    }
};
/* ---------------------------------------------UPADATE COUNTRIES -----------------------------------------------------*/
const updateCountries = async(req, res) => {
    let { countries_id, name } = req.body;

    await sequelize.query(`UPDATE countries 
    SET name='${name}'
    WHERE countries_id=${countries_id}`)
        .then(result => {
            if (result[1] == 0) {
                response.error(req, res, 'No se pudo actualizar el pais', 400, 'Error update pais[updateCountries]');
            } else {
                response.success(req, res, 'Número de paises actualizados: ' + result[0].affectedRows, 200);
            }
        })
        .catch(err => {
            response.error(req, res, 'Error inesperado actualizando paises', 400, err);
        });
};

/* ---------------------------------------------DELETE COUNTRIES -----------------------------------------------------*/
const deleteCountries = async(req, res) => {
    let { countries_id } = req.body;
    if (!countries_id) return res.status(400).json('parametros mal enviados');

    let deleteCountriesQuery = await querys.delete(req, res, 'countries', 'countries_id', countries_id);

    if (!!deleteCountriesQuery) {
        response.success(req, res, `Pais eliminado por id: ${countries_id}`, 200);
    } else {
        response.error(req, res, 'No se puede eliminar Pais', 400, 'Error eliminando pais[deleteCountriesQuery]');
    }
};
/* -----------------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------CREATE CITIES -----------------------------------------------------*/
const createCities = async(req, res) => {
    let { name, countries_id } = req.body;

    let alreadyExists = await querys.selectDataByName(req, res, 'cities', 'name', 'name', name);

    if (!!alreadyExists) {
        response.error(req, res, 'Ya existe una ciudad con ese nombre', 200, 'Error ya existe esta cities[createcities]');
    } else {
        let insert = await querys.insert(req, res, 'cities', 'name, countries_id', `'${name}',${countries_id}`);
        if (!!insert) {
            response.success(req, res, 'Ciudad creada con éxito', 201);
        } else {
            response.error(req, res, 'Error insertando ciudad', 400, 'Error insertando[createCities]');
        }
    }
};
/* ---------------------------------------------READ CITIES -----------------------------------------------------*/
const readCities = async(req, res) => {
    const paramsId = req.params.id;
    let readCont = await querys.selectDataById(req, res, 'cities AS ct INNER JOIN countries As c ON ct.countries_id = c.countries_id', 'ct.cities_id, ct.name', 'ct.countries_id', paramsId);

    if (!!readCont) {
        response.success(req, res, { readCont }, 200);
    } else {
        response.error(req, res, 'Error leyendo los contactos', 400, 'Error leyendo contactos[getContacts]');
    }
};
/* ---------------------------------------------UPADATE CITIES -----------------------------------------------------*/
const updateCities = async(req, res) => {
    let { cities_id, name } = req.body;

    await sequelize.query(`UPDATE cities 
    SET name='${name}'
    WHERE cities_id=${cities_id}`)
        .then(result => {
            if (result[1] == 0) {
                response.error(req, res, 'No se pudo actualizar la ciudad', 400, 'Error update region[updateCiudad]');
            } else {
                response.success(req, res, 'Número de ciudades actualizadas: ' + result[0].affectedRows, 200);
            }
        })
        .catch(err => {
            response.error(req, res, 'Error inesperado actualizando ciudad', 400, err);
        });
};

/* ---------------------------------------------DELETE CITIES -----------------------------------------------------*/
const deleteCities = async(req, res) => {
    let { cities_id } = req.body;
    if (!cities_id) return res.status(400).json('parametros mal enviados');

    let deleteCitiesQuery = await querys.delete(req, res, 'cities', 'cities_id', cities_id);

    if (!!deleteCitiesQuery) {
        response.success(req, res, `Ciudad eliminada por id: ${cities_id}`, 200);
    } else {
        response.error(req, res, 'No se puede eliminar ciudad', 400, 'Error eliminando ciudad[deleteCities]');
    }
};

module.exports = {
    /* region */
    createRegion,
    readRegion,
    updateRegion,
    deleteRegion,
    /* countries */
    createCountries,
    readCountries,
    updateCountries,
    deleteCountries,
    /* cities */
    createCities,
    readCities,
    updateCities,
    deleteCities
}