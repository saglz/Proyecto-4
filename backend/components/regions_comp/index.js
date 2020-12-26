const regCountCitiesRouter = require('express').Router();

const { validateToken } = require('../../auth/security');

const { createRegion, readRegion, updateRegion, deleteRegion, createCountries, readCountries, updateCountries, deleteCountries, createCities, readCities, updateCities, deleteCities } = require('./region');

regCountCitiesRouter.post('/createRegion', validateToken, createRegion);
regCountCitiesRouter.get('/readRegion', validateToken, readRegion);
regCountCitiesRouter.put('/updateRegion', validateToken, updateRegion);
regCountCitiesRouter.delete('/deleteRegion', validateToken, deleteRegion);
regCountCitiesRouter.post('/createCountries', validateToken, createCountries);
regCountCitiesRouter.get('/readCountries/:id', validateToken, readCountries);
regCountCitiesRouter.put('/updateCountries', validateToken, updateCountries);
regCountCitiesRouter.delete('/deleteCountries', validateToken, deleteCountries);
regCountCitiesRouter.post('/createCities', validateToken, createCities);
regCountCitiesRouter.get('/readCities/:id', validateToken, readCities);
regCountCitiesRouter.put('/updateCities', validateToken, updateCities);
regCountCitiesRouter.delete('/deleteCities', validateToken, deleteCities);

module.exports = regCountCitiesRouter;