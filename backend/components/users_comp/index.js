const usersRouter = require('express').Router()

const { createUsers, readUsers, updateUsers, deleteUsers } = require('./users')

usersRouter.post('/createUsers', createUsers);
usersRouter.get('/readUsers', readUsers);
usersRouter.put('/updateUsers', updateUsers);
usersRouter.delete('/deleteUsers', deleteUsers);

module.exports = usersRouter;