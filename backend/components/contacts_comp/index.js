const contactsRouter = require('express').Router()

/* Middleware */
const { validateToken, validateUser } = require('../../auth/security');
const { createContacts, readContacts, updateContacts, deleteContacts } = require('./contacts');
const { controllerContacts } = require('./controller');

contactsRouter.post('/createContacts', validateToken, controllerContacts, createContacts);
contactsRouter.get('/readContacts', validateToken, readContacts);
contactsRouter.put('/updateContacts', validateToken, controllerContacts, updateContacts);
contactsRouter.delete('/deleteContacts', validateToken, deleteContacts);

module.exports = contactsRouter;