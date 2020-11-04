/*const companies = require('../components/companies_comp/company');
 const connMongoose = require('../store/conexion');

const companies = connMongoose.model('companies', {
    nit: Number,
    name: String,
    phone: Number,
    email: String,
    address: String,
}); 

function searchCompany(req, res, data) {
    companies.find({ nit: data })
        .then((result) => {
            if (!result) {
                console.log('La empresa existe');
                return res.status(404).json('La empresa existe');
            } else {
                console.log('La empresa NO EXISTE');
            }
        })
        .catch((err) => {
            console.error(err);
        });
};

module.exports = searchCompany;*/