const cubeModel = require('../models/cube');

function index(req, res, next) {
  cubeModel.find().then(cubes => {
    res.render('index.hbs', { cubes });
  }).catch(next);
}

function details(req, res, next) {
  const id = req.params.id;
  console.log(req.params)
  cubeModel.findById(id).then(cube => {
    if (!cube) { res.redirect('/not-found'); return; }
    res.render('details.hbs', { cube });
  }).catch(next);
}

function notFound(req, res) {
  res.render('404.hbs');
}

function about(req, res) {
  res.render('about.hbs');
}

function postCreate(req, res) {
  const { name = null, description = null, imageUrl = null, difficultyLevel = null } = req.body;
  cubeModel.create({name, description, imageUrl, difficultyLevel}).then((cube) => {
    console.log(cube);
    res.redirect('/');
  });
}

function getCreate(req, res) {
  res.render('create.hbs');
}

module.exports = {
  index,
  getCreate,
  postCreate,
  details,
  notFound,
  about
};

