const companiesRouter = require('express').Router()

/* Middleware */
const { validateToken, validateUser } = require('../../auth/security');
const { createCompany, readCompany, updateCompany, deleteCompany } = require('./company');
const { controllerCompany } = require('./controller');

companiesRouter.post('/createCompany', controllerCompany, createCompany);
companiesRouter.get('/readCompany', readCompany);
companiesRouter.put('/updateCompany', controllerCompany, updateCompany);
companiesRouter.delete('/deleteCompany', deleteCompany);

module.exports = companiesRouter;