const companiesRouter = require('express').Router()

/* Middleware */
const { validateToken, validateUser } = require('../../auth/security');
const { createCompany, readCompany, updateCompany, deleteCompany } = require('./company');
const { controllerCompany } = require('./controller');

companiesRouter.post('/createCompany', validateToken, controllerCompany, createCompany);
companiesRouter.get('/readCompany', validateToken, readCompany);
companiesRouter.put('/updateCompany', validateToken, controllerCompany, updateCompany);
companiesRouter.delete('/deleteCompany', validateToken, deleteCompany);

module.exports = companiesRouter;