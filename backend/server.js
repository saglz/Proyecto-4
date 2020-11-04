const express = require('express');
const app = express();

const companiesRouter = require('./components/companies_comp');
const usersRouter = require('./components/users_comp');
const contactsRouter = require('./components/contacts_comp');

app.use(express.json());

app.use('/v1', companiesRouter);
app.use('/v1', usersRouter);
app.use('/v1', contactsRouter);

app.listen(3000, function() {
    console.log('listening on 3000')
})