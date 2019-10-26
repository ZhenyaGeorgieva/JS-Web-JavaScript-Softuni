const models = require('../models');
const utils = require('../utils');
const appConfig = require('../app-config');
const { validationResult } = require('express-validator');

function loginGet(req, res) {
  res.render('login.hbs');
}

function loginPost(req, res, next) {
  const { username, password } = req.body;

  models.userModel.findOne({ username })
    .then(user => Promise.all([user, user ? user.matchPassword(password) : false]))
    .then(([user, match]) => {
      if (!match) {
        res.render('login.hbs', {
          errors: {
            loginMessage: 'Wrong password or username!'
          }
        });
        return;
      }
      const token = utils.jwt.createToken({ id: user._id });
      res.cookie(appConfig.authCookieName, token).redirect('/');
    });
}

function registerGet(req, res) {
  res.render('register.hbs');
}

function registerPost(req, res, next) {
  const { username, password, repeatPassword } = req.body;
  if (password !== repeatPassword) {
    res.render('register.hbs', {
      errors: {
        repeatPassword: 'Password and repeat password don\'t match!'
      }
    });
    return;
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('register.hbs', {
      message: errors.array()[0].msg,
      oldInput: req.body
    })
  }
  return models.userModel.create({ username, password }).then(() => {
    res.redirect('/login');
  }).catch(err => {
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