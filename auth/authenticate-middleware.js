const bcrypt = require('bcryptjs');

// const Users = require('../users/users-model.js');


module.exports = authenticate;

function authenticate(req, res, next) {
    const { username, password } = req.headers;


    Users.findBy({ username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            next();
        } else {
            res.status(401).json({ message: 'You Shall not pass' });
        }
    })
    .catch(error => {
        res.status(500).json(error)
    });
}