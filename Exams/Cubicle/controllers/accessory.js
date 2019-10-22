const models = require('../models');


function getCreate(req, res) {
    let user = req.user;
    res.render('createAccessory.hbs', { user })
}

function postCreate(req, res) {
    const user = req.user;
    const { name = null, description = null, imageUrl = null } = req.body;
    models.accessoryModel.create({ name, description, imageUrl }).then(cube => {
        res.redirect('/')
    }).catch(err => {
        if (err.name === 'ValidationError') {
            res.render('createAccessory.hbs', {
                user, errors: err.errors
            });
            return;
        }
        next(err);
    });
}

function addAccessoryGet(req, res, next) {
    const user = req.user;
    const cubeId = req.params.id;

    Promise.all([
        models.cubeModel.findOne({ _id: cubeId }),
        models.accessoryModel.find({ cubes: { $nin: cubeId } })
    ]).then(([cube, accessories]) => {
        res.render('attachAccessory.hbs', { user, cube, accessories })
    }).catch(next)
}

function addAccessoryPost(req, res, next) {
    const user = req.user;
    const cubeId = req.params.id;
    const accessoryId = req.body.accessory;

    Promise.all([
        models.accessoryModel.findOneAndUpdate({ _id: accessoryId }, { $addToSet: { cubes: cubeId } }),
        models.cubeModel.findOneAndUpdate({ _id: cubeId }, { $addToSet: {accessories : accessoryId } })
    ]).then(() => {
        res.redirect('/')
    }).catch(next)
}


module.exports = {
    getCreate,
    postCreate,
    addAccessoryGet,
    addAccessoryPost
};
