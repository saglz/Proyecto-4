const companiesRouter = require('express').Router()

const { createCompany, readCompany, updateCompany, deleteCompany } = require('./company')

companiesRouter.post('/createCompany', createCompany);
companiesRouter.get('/readCompany', readCompany);
companiesRouter.put('/updateCompany', updateCompany);
companiesRouter.delete('/deleteCompany', deleteCompany);

module.exports = companiesRouter;