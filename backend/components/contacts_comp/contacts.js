const sequelize = require('../../store/conexionMysql');
const querys = require('../../store/querys');
const response = require('../../network/response');

/* ---------------------------------------------CREATE CONTACTS -----------------------------------------------------*/
const createContacts = async(req, res) => {
    let { id, name, lastName, email, position, channel, interest, companies_id } = req.body;

    let alreadyExists = await querys.selectDataById(req, res, 'contacts', 'id', 'id', id);

    if (!!alreadyExists) {
        response.error(req, res, 'Ya existe un contacto con esa identificación', 200, 'Error ya existe el id[createContacts]');
    } else {
        let insert = await querys.insert(req, res, 'contacts', 'id,name, lastName,email,position,channel,interest,companies_id', `${id},'${name}','${lastName}','${email}','${position}','${channel}',${interest},${companies_id}`);
        if (!!insert) {
            response.success(req, res, 'Contacto creada con éxito', 201);
        } else {
            response.error(req, res, 'Error insertando contacto', 400, 'Error insertando[createContacts]');
        }
    }
};

/* ---------------------------------------------READ CONTACTS -----------------------------------------------------*/
const readContacts = async(req, res) => {

    let readCont = await querys.selectData(req, res, '((((contacts AS C INNER JOIN companies AS cp ON c.companies_id = cp.companies_id)INNER JOIN cities AS ct ON ct.cities_id = cp.cities_id)INNER JOIN countries AS cou ON cou.countries_id = ct.countries_id)INNER JOIN region AS r ON r.region_id = cou.region_id)', 'c.name, c.lastName, c.email, cp.name as company,cou.name as country, r.name as region, c.position, c.channel, c.interest, c.id');

    if (!!readCont) {
        response.success(req, res, { readCont }, 200);
    } else {
        response.error(req, res, 'Error leyendo los contactos', 400, 'Error leyendo contactos[getContacts]');
    }
};

/* ---------------------------------------------UPDATE CONTACTS -----------------------------------------------------*/
const updateContacts = async(req, res) => {
    let { id, name, lastName, email, position, channel, interest, companies_id } = req.body;

    await sequelize.query(`UPDATE contacts 
    SET name='${name}',lastName='${lastName}',email='${email}',position='${position}',channel='${channel}',interest=${interest}, companies=${companies_id}
    WHERE id=${id}`)
        .then(result => {
            if (result[1] == 0) {
                response.error(req, res, 'Error No se puede actualizar contacto', 400, 'Error actualizando contactos[updateContacts]');
            } else {
                response.success(req, res, 'Número de contactos actualizados: ' + result[0].affectedRows, 200);
            }
        })
        .catch(err => {
            response.error(req, res, 'Error No se puede actualizar contacto', 400, err);
        });
};

/* ---------------------------------------------DELETE CONTACTS -----------------------------------------------------*/
const deleteContacts = async(req, res) => {
    let { id } = req.body;
    if (!id) return res.status(400).json('parametros mal enviados');

    let deleteCont = await querys.delete(req, res, 'companies', 'nit', nit);

    if (!!deleteCont) {
        response.success(req, res, `Contacto eliminado por id: ${id}`, 200);
    } else {
        response.error(req, res, 'No se puede eliminar contacto', 400, 'Error eliminando contacto[deleteContacts]');
    };
};

module.exports = {
    createContacts,
    readContacts,
    updateContacts,
    deleteContacts
}