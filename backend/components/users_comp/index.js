const usersRouter = require('express').Router()

const { validateToken, validateUser } = require('../../auth/security');

const { createUsers, readUsers, updateUsers, deleteUsers, loginUsers } = require('./users');
const { controllerUsers, controllerLogin } = require('./controller');

usersRouter.post('/login', controllerLogin, loginUsers);

usersRouter.post('/createUsers', validateToken, validateUser, controllerUsers, createUsers);
usersRouter.get('/readUsers', validateToken, validateUser, readUsers);
usersRouter.put('/updateUsers', validateToken, validateUser, controllerUsers, updateUsers);
usersRouter.delete('/deleteUsers', validateToken, validateUser, deleteUsers);

module.exports = usersRouter;