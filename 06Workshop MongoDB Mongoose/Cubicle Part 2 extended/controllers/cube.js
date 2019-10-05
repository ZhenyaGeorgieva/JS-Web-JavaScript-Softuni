const cubeModel = require('../models/cube');
const accessoryModel = require('../models/accessory');


function index(req, res, next) {
  cubeModel.find().then(cubes => {
    res.render('index.hbs', { cubes });
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
  cubeModel.create({ name, description, imageUrl, difficultyLevel }).then((cube) => {
    res.redirect('/');
  });
}

function getCreate(req, res) {
  res.render('create.hbs');
}

function getAttachAccessory(req, res,next) {
  const { id: cubeId } = req.params;
  cubeModel.findById(cubeId).then(
    cube => Promise.all([cube, accessoryModel.find({ cubes: { $nin: cubeId } })])
  ).then(([cube, filterAccessories]) => {
    res.render('attachAccessory.hbs', {
      cube,
      accessories: filterAccessories.length > 0 ? filterAccessories : null
    });
  }).catch(next);
}

function postAttachAccessory(req, res,next) {
  const { id } = req.params;
  const { accessory: accessoryId } = req.body;
  Promise.all([
    cubeModel.update({ _id: id }, { $push: { accessories: accessoryId } }),
    accessoryModel.update({ _id: accessoryId }, { $push: { cubes: id } })
  ])
    .then(() => {
      res.redirect('/');
    })
    .catch(next);
}

module.exports = {
  index,
  getCreate,
  postCreate,
  details,
  notFound,
  about,
  getAttachAccessory,
  postAttachAccessory
};

