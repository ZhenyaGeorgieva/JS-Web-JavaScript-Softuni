const { accessoryModel, cubeModel } = require('../models');

function createPost(req, res, next) {
    const { name = null, description = null, imageUrl = null } = req.body;
    accessoryModel.create({ name, description, imageUrl })
        .then(created => {
            res.redirect('/');
        })
        .catch(next);
}

function createGet(req, res, next) {
    res.render('createAccessory.hbs');
}

function attachPost(req, res, next) {
    const { id } = req.params;
    const { accessory: accessoryId } = req.body;
    Promise.all([
        cubeModel.update({ _id: id }, { $push: { accessories: accessoryId } }),
        accessoryModel.update({ _id: accessoryId }, { $push: { cubes: id } })])
        .then(() => {
            res.redirect('/')
        })
        .catch(next);

}

function attachGet(req, res, next) {
    const { id: cubeId } = req.params;
    Promise.all([
        cubeModel.findById(cubeId),
        accessoryModel.find({ cubes: { $nin: cubeId } })])
        .then(([cube, filteredAccessories]) => {
            res.render('attachAccessory.hbs', { cube, filteredAccessories })
        })
        .catch(next);

}
module.exports = {
    createPost,
    createGet,
    attachGet,
    attachPost
}
