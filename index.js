const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const authenticate = require('./auth/authenticate-middleware.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send('Its Working!!!!!')
})



const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Server Running On Port ${port} **\n`));