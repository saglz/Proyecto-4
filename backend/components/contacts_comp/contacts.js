const sequelize = require('../../store/conexionMysql');

const createContacts = async(req, res) => {
    let { id, name, lastName, email, position, channel, interest } = req.body;
    if (!id || !name || !lastName || !email || !position || !channel || !interest) return res.status(400).json('parametros mal enviados');
    //validar si ya existe un contacto con los mismo datos
    await sequelize.query(`SELECT * FROM contacts WHERE id=${id}`, {
            type: sequelize.QueryTypes.SELECT,
        })
        .then(result => {
            if (result == "") {
                sequelize.query(`INSERT INTO contacts (id,name, lastName,email,position,channel,interest,companies_id)
                VALUES (${id},'${name}','${lastName}','${email}','${position}','${channel}',${interest},1)`)
                    .then(response => {
                        res.status(200).json('Número de contactos agregados: ' + response[1]);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            } else {
                res.status(200).json('Ya existe un contacto');
            }
        })
};

const readContacts = async(req, res) => {
    await sequelize.query(`SELECT * FROM contacts`, {
            type: sequelize.QueryTypes.SELECT,
        })
        .then(result => {
            if (result == "") {
                res.status(404).json('No hay contactos');
            } else {
                res.status(200).json({ result });
            }
        })
        .catch(err => {
            console.error(err);
        });
};

const updateContacts = async(req, res) => {
    let { id, name, lastName, email, position, channel, interest } = req.body;
    if (!id || !name || !lastName || !email || !position || !channel || !interest) return res.status(400).json('parametros mal enviados');

    await sequelize.query(`UPDATE contacts 
    SET name='${name}',lastName='${lastName}',email='${email}',position='${position}',channel='${channel}',interest=${interest}
    WHERE id=${id}`)
        .then(result => {
            if (result[1] == 0) {
                res.status(400).json('No pudo actualizar el contacto');
            } else {
                res.status(200).json('Número de contactos actualizados: ' + result[0].affectedRows);
            }
        })
        .catch(err => {
            console.error(err);
        });
};

const deleteContacts = async(req, res, next) => {
    let { id } = req.body;
    if (!id) return res.status(400).json('parametros mal enviados');
    await sequelize.query(`DELETE FROM contacts WHERE id=${id}`)
        .then(result => {
            if (result[1] != 0) {
                res.status(200).json(`Contacto eliminado por id: ${id}`);
            } else {
                res.status(406).json(`No se puede eliminar contacto`);
            }
        })
        .catch((err) => {
            console.error(err);
        });
};

module.exports = {
    createContacts,
    readContacts,
    updateContacts,
    deleteContacts
}