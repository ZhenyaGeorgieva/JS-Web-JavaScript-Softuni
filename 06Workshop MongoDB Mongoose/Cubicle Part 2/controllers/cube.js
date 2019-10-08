const {cubeModel} = require('../models');

function index(req, res, next) {
  const { from, to, search } = req.query;
  let query={};

  if(search){
    query.name={$regex:search};
  }if(from){
    query.difficultyLevel={$gte:+from}
  }if(to){
    query.difficultyLevel={...query.difficultyLevel,$lte:+to}
  }


  cubeModel.find(query).then(cubes => {
    res.render('index.hbs', { cubes, search, from, to });
  }).catch(next);
}

function details(req, res, next) {
  const id = req.params.id;
  cubeModel.findById(id).populate('accessories').then(cube => {
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
  cubeModel.create({ name, description, imageUrl, difficultyLevel }).then(() => {
    res.redirect('/');
  });
}

function getCreate(req, res) {
  res.render('create.hbs');
}

module.exports = {
  index,
  details,
  notFound,
  about,
  postCreate,
  getCreate
};