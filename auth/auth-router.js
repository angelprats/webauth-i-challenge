const router = require('express').Router();
const bcrypt = require('bcryptjs');
// const session = require('express-session');

const Users = require('../users/users-model.js');

router.post('api/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.add(user)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

router.post('/api/login', (req, res) => {
    let { username, password } = req.body;

    Users.findById({ username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            res.session.username = user.username;

            res.status(200).json({
                message: `Welcome ${user.username}!`,
            });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

router.get('/api/users', (req, res) => {
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
})


router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ message: 'you can checkout, but you cant leave'});
            } else {
                res.status(200).json({ message: 'Adios!!'});
            }
        });
            } else {
                res.status(200).json({ message: 'Peace!!!!'});
            }
        });


module.exports = router;