const express = require('express');

// const authRouter = require('../auth/auth-router.js');
// const userRouter = require('../users/users-router.js');
// const setupGlobalMiddleware = require('./setup-middleware.js');

const server = express();

setupGlobalMiddleware(server);

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.json({ api: 'Its Working' });
});


module.exports = server;