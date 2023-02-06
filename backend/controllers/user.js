const bcrypt = require('bcrypt');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

exports.register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(() => res.status(201).json({ message: 'User created !'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }))
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user === null){
                return res.status(401).json({message: 'Paire Identifiant/Mot de passe incorrecte'})
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if(!valid){
                            return res.status(401).json({ message: 'Paire Indentifiant/Mot de passe incorrecte'})
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign({ userId: user._id}, 'SECRET_BIEN_GARDE', { expiresIn: '24h' })
                            })
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};

exports.get = (req, res, next) => {
    User.find()
        .then(Users => res.status(200).json(Users))
        .catch(error => res.status(400).json({ error }));
}