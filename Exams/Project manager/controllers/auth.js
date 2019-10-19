const models = require('../models');
const utils = require('../utils');
const appConfig = require('../app-config');

function login(req, res) {
  res.render('login.hbs');
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

function register(req, res) {
  res.render('register.hbs');
}

function registerPost(req, res, next) {
  let { username, password, firstName,lastName,imageUrl } = req.body;
  if(!imageUrl){
    imageUrl='https://images.unsplash.com/photo-1535551951406-a19828b0a76b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60'
  }
  return models.userModel.create({ username, password,firstName,lastName,imageUrl:imageUrl, roles:'user'}).then(() => {
    res.redirect('/');
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

function logout(req, res) {
  const token = req.cookies[appConfig.authCookieName];
  models.tokenBlacklistModel.create({ token }).then(() => {
    res.clearCookie(appConfig.authCookieName).redirect('/');
  });
}


module.exports = {
  login,
  loginPost,
  register,
  registerPost,
  logout
};