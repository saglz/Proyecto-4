const regCountCitiesRouter = require('express').Router()

const { createRegCountCities, readRegCountCities, updateRegCountCities, deleteRegCountCities } = require('./users')

regCountCitiesRouter.post('/createRCC', createRegCountCities);
regCountCitiesRouter.get('/readRCC', readRegCountCities);
regCountCitiesRouter.put('/updateRCC', updateRegCountCities);
regCountCitiesRouter.delete('/deleteRCC', deleteRegCountCities);

module.exports = regCountCitiesRouter;