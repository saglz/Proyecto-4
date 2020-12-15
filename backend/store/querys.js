const sequelize = require('./conexionMysql');
const response = require('../network/response');

let queryResult;
/* *******************************************************SELECT************************************************ */

exports.selectAll = async(req, res, table) => {
    queryResult = "";
    await sequelize.query(`SELECT * FROM ${table}`, {
            type: sequelize.QueryTypes.SELECT,
        })
        .then(result => {
            if (result != "") {
                queryResult = result;
            }
        }).catch(err => {
            console.error(err)
            response.error(req, res, `Error en la busqueda de la informa del ${table}`, 400, `Error buscando información en ${table}[selectALL]`);
        });
    return queryResult;

}

exports.selectData = async(req, res, table, data) => {
    queryResult = "";
    await sequelize.query(`SELECT ${data} FROM ${table}`, {
            type: sequelize.QueryTypes.SELECT,
        })
        .then(result => {
            if (result != "") {
                queryResult = result;
            }
        }).catch(err => {
            console.error(err);
            response.error(req, res, `Error en la busqueda de la informa del ${table}`, 400, `Error buscando información en ${table}[selectALL]`);
        });
    return queryResult;
}

exports.selectDataById = async(req, res, table, data, condWhereTable, idWhere) => {
    queryResult = "";
    await sequelize.query(`SELECT ${data} FROM ${table} WHERE ${condWhereTable}=${idWhere}`, {
            type: sequelize.QueryTypes.SELECT,
        })
        .then(result => {
            if (result != "") {
                queryResult = result;
            }
        }).catch(err => {
            console.error(err);
            response.error(req, res, `Error en la busqueda de la informa del ${table}`, 400, `Error buscando información en ${table}[selectDataById]`);
        });
    return queryResult;
}
exports.selectDataByName = async(req, res, table, data, condWhereTable, idWhere) => {
    queryResult = "";
    await sequelize.query(`SELECT ${data} FROM ${table} WHERE ${condWhereTable}='${idWhere}'`, {
            type: sequelize.QueryTypes.SELECT,
        })
        .then(result => {
            if (result != "") {
                queryResult = result;
            }
        }).catch(err => {
            console.error(err);
            response.error(req, res, `Error en la busqueda de la informa del ${table}`, 400, `Error buscando información en ${table}[selectDataByName]`);
        });
    return queryResult;
}
exports.selectDataByNameAnd = async(req, res, table, data, condWhereTable, idWhere, condWhereTable2, idWhere2) => {
    queryResult = "";
    await sequelize.query(`SELECT ${data} FROM ${table} WHERE ${condWhereTable}='${idWhere}'AND ${condWhereTable2}='${idWhere2}'`, {
            type: sequelize.QueryTypes.SELECT,
        })
        .then(result => {
            if (result != "") {
                queryResult = result;
            }
        }).catch(err => {
            console.error(err);
            response.error(req, res, `Error en la busqueda de la informa del ${table}`, 400, `Error buscando información en ${table}[selectDataByNameAnd]`);
        });
    return queryResult;
}

/* ******************************************************* INSERT INTO ************************************************ */

exports.insert = async(req, res, table, structTable, values) => {
    queryResult = ""
    await sequelize.query(`INSERT INTO ${table}(${structTable}) VALUES (${values})`)
        .then(result => {
            if (result != "") {
                queryResult = result;
            }
        }).catch(err => {
            console.error(err);
            response.error(req, res, `Error en la busqueda de la informa del ${table}`, 400, `Error insertando información en ${table}[insert]`);
        });
    return queryResult;
}

/* ******************************************************* DELETE INTO ************************************************ */

exports.delete = async(req, res, table, condWhereTable, idWhere) => {

    queryResult = "";
    await sequelize.query(`DELETE FROM ${table} WHERE ${condWhereTable}=${idWhere}`) //borra el producto sino esta asociado a una orden
        .then(result => {
            if (result != "") {
                queryResult = result;
            } else {
                queryResult = false;
            }
        }).catch(err => {
            response.error(req, res, `Error eliminando la identificación ${idWhere}(${table}) porque esta asociado a otros datos`, 400, err);
        });
    return queryResult;
}