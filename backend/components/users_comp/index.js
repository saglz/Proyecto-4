const usersRouter = require('express').Router()

const { createUsers, readUsers, updateUsers, deleteUsers, loginUsers } = require('./users');
const { controllerUsers, controllerLogin } = require('./controller');

usersRouter.post('/login', controllerLogin, loginUsers);

usersRouter.post('/createUsers', controllerUsers, createUsers);
usersRouter.get('/readUsers', readUsers);
usersRouter.put('/updateUsers', controllerUsers, updateUsers);
usersRouter.delete('/deleteUsers', deleteUsers);

module.exports = usersRouter;