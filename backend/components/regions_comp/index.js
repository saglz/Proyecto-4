const regCountCitiesRouter = require('express').Router();

const { readRegion, readCountries, readCities } = require('./region');

regCountCitiesRouter.get('/readRegion', readRegion);
regCountCitiesRouter.get('/readCountries/:id', readCountries);
regCountCitiesRouter.get('/readCities/:id', readCities);

module.exports = regCountCitiesRouter;