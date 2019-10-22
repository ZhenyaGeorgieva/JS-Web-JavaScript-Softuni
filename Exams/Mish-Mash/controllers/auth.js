const models = require('../models');
const utils = require('../utils');
const appConfig = require('../app-config');

function loginGet(req, res) {
    res.render('login.hbs');
}

function registerGet(req, res,next) {
    models.userModel.find()
        .then(users => {
            if (users.length==0) {
                models.userModel.create({
                    username: 'admin',
                    password: 12345,
                    roles: 'admin',
                    email:'admin@admin'
                }).then(()=>console.log('admin created')).catch(next)
            }
            res.render('register.hbs');
        }).catch(next)
}

function registerPost(req, res, next) {
    const { username, password, confirmPassword,email } = req.body;
    if (password !== confirmPassword) {
        res.render('register.hbs', {
            errors: {
                repeatPassword: 'Password and repeat password don\'t match!'
            }
        });
        return;
    }
    return models.userModel.create({ username, password, email,roles: 'user' }).then(() => {
        res.redirect('/login');
    }).catch(err => {
        if (err.name === 'ValidationError') {
            res.render('register.hbs', {
                errors: err.errors
            });
            return;
        }
        if (err.name === 'MongoError' && err.code === 11000) {
            res.render('register.hbs', {
                errors: {
                    usernameTaken: 'Username already taken!'
                }
            });
            return;
        }
        next(err);
    });
}

function loginPost(req, res, next) {
    const { username, password } = req.body;

    models.userModel.findOne({ username })
        .then(user => Promise.all([user, user ? user.matchPassword(password) : false]))
        .then(([user, match]) => {
            if (!match) {
                res.render('login.hbs', { loginMessage: 'Wrong password or username!' });
                return;
            }
            const token = utils.jwt.createToken({ id: user._id });
            res.cookie(appConfig.authCookieName, token).redirect('/');
        });
}

function logout(req, res) {
    const token = req.cookies[appConfig.authCookieName];
    models.tokenBlacklistModel.create({ token }).then(() => {
        res.clearCookie(appConfig.authCookieName).redirect('/');
    });
}



module.exports = {
registerGet,
registerPost,
loginGet,
loginPost,
logout
};


