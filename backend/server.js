const express = require('express');
const app = express();
const cors = require('cors')

const companiesRouter = require('./components/companies_comp');
const usersRouter = require('./components/users_comp');
const contactsRouter = require('./components/contacts_comp');
const regCountCitiesRouter = require('./components/regions_comp');

app.use(express.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

app.use('/v1', companiesRouter);
app.use('/v1', usersRouter);
app.use('/v1', contactsRouter);
app.use('/v1', regCountCitiesRouter);

app.listen(3000, function() {
    console.log('listening on 3000')
})