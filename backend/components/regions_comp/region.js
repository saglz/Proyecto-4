const connMongoose = require('../../store/conexion');

const regCountCities = connMongoose.model('regCountCities', {

    regions: {
        nameReg: String,
        countries: {
            nameCount: String,
            cities: {
                nameCity: String
            }
        }
    }

});

const createRegCountCities = async(req, res, next) => {
    let { nameReg, nameCount, nameCity } = req.body;
    if (!nameReg || !nameCount || !nameCity) return res.status(400).json('parametros mal enviados');
    /* searchCompany(req||! res, nit); */

    let objAddReg = {
        nameReg,
        nameCount,
        nameCity
    }
    const addRegCouCit = new regCountCities(objAddReg);
    addRegCouCit.save();
    res.status(200).json('Agregado');

};

const readRegCountCities = async(req, res, next) => {
    regCountCities.find()
        .then((result) => {
            res.status(200).json({ result });
        })
        .catch((err) => {
            console.error(err);
        });
};

const updateRegCountCities = async(req, res, next) => {
    let { idU, fullName, email, position, userName, password } = req.body;
    if (!idU || !fullName || !email || !position || !userName || !password) return res.status(400).json('parametros mal enviados');
    regCountCities.findOne({ idU: idU })
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

const deleteRegCountCities = async(req, res, next) => {
    let { idU } = req.body;
    if (!idU) return res.status(400).json('parametros mal enviados');
    regCountCities.deleteOne({ idU: idU })
        .then((result) => {
            console.log(result);
            res.status(200).json('Contacto eliminado correctamente');
        })
        .catch((err) => {
            console.error(err);
        });
};

module.exports = {
    createRegCountCities,
    readRegCountCities,
    updateRegCountCities,
    deleteRegCountCities
}