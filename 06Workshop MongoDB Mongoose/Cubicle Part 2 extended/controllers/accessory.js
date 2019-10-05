const cubeModel = require('../models/cube');
const accessoryModel = require('../models/accessory');

function postCreate(req, res) {
  const { name = null, description = null, imageUrl = null } = req.body;
  accessoryModel.create({name, description, imageUrl}).then((accessory) => {
    console.log(accessory);
    res.redirect('/');
  });
}

function getCreate(req, res) {
  res.render('createAccessory.hbs');
}


module.exports = {
  getCreate,
  postCreate,
};

