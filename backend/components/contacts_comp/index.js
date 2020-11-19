const contactsRouter = require('express').Router()

/* Middleware */
const { validateToken, validateUser } = require('../../auth/security');
const { createContacts, readContacts, updateContacts, deleteContacts } = require('./contacts');
const { controllerContacts } = require('./controller');

contactsRouter.post('/createContacts', controllerContacts, createContacts);
contactsRouter.get('/readContacts', readContacts);
contactsRouter.put('/updateContacts', controllerContacts, updateContacts);
contactsRouter.delete('/deleteContacts', deleteContacts);

module.exports = contactsRouter;