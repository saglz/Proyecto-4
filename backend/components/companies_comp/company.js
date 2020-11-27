const sequelize = require('../../store/conexionMysql');
const querys = require('../../store/querys');
const response = require('../../network/response');

/* ---------------------------------------------CREATE COMPANY -----------------------------------------------------*/
const createCompany = async(req, res) => {
    let { nit, name, phone, email, address, cities_id } = req.body;

    let alreadyExists = await querys.selectDataById(req, res, 'companies', 'nit', 'nit', nit);

    if (!!alreadyExists) {
        response.error(req, res, 'Ya existe una compañía con ese NIT', 200, 'Error ya existe el NIT[createCompany]');
    } else {
        let insert = await querys.insert(req, res, 'companies', 'nit, name, phone, email, address, cities_id', `${nit},'${name}',${phone},'${email}','${address}',${cities_id}`);
        if (!!insert) {
            response.success(req, res, 'Compañía creada con éxito', 201);
        } else {
            response.error(req, res, 'Error insertando compañía', 400, 'Error insertando[createCompany]');
        }
    }
};

/* ---------------------------------------------READ COMPANY -----------------------------------------------------*/
const readCompany = async(req, res) => {

    let readComp = await querys.selectData(req, res, 'companies c INNER JOIN cities cp ON c.cities_id=cp.cities_id', 'c.nit, c.name, c.phone, c.email, c.address, cp.name as city');

    if (!!readComp) {
        response.success(req, res, { readComp }, 200);
    } else {
        response.error(req, res, 'Error leyendo las compañias', 400, 'Error leyendo compañías[getCompany]');
    }
};

/* ---------------------------------------------UPADATE COMPANY -----------------------------------------------------*/
const updateCompany = async(req, res) => {
    let { nit, name, phone, email, address, cities_id } = req.body;

    await sequelize.query(`UPDATE companies 
    SET name='${name}',phone=${phone},email='${email}',address='${address}',cities_id=${cities_id}
    WHERE nit=${nit}`)
        .then(result => {
            if (result[1] == 0) {
                response.error(req, res, 'No se pudo actualizar la compañía', 400, 'Error update company[updateCompany]');
            } else {
                response.success(req, res, 'Número de contactos actualizados: ' + result[0].affectedRows, 200);
            }
        })
        .catch(err => {
            response.error(req, res, 'Error inesperado actualizando compañía', 400, err);
        });
};

/* ---------------------------------------------DELETE COMPANY -----------------------------------------------------*/
const deleteCompany = async(req, res) => {
    let { nit } = req.body;
    if (!nit) return res.status(400).json('parametros mal enviados');

    let deleteComp = await querys.delete(req, res, 'companies', 'nit', nit);

    if (!!deleteComp) {
        response.success(req, res, `Compañía eliminada por NIT: ${nit}`, 200);
    } else {
        response.error(req, res, 'No se puede eliminar compañía', 400, 'Error eliminando compañía[deleteCompany]');
    }
};

module.exports = {
    createCompany,
    readCompany,
    updateCompany,
    deleteCompany
}