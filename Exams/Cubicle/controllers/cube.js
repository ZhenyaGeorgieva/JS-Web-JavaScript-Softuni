const models = require('../models');

function index(req, res, next) {
    const user = req.user;
    if (!user) {
        models.cubeModel.find()
            .then(cubes => {
                res.render('index.hbs', { cubes })
            }).catch(next);
    } else {
        models.cubeModel.find()
            .then(cubes => {
                res.render('index.hbs', { user, cubes })
            }).catch(next);
    }
}

function about(req, res, next) {
    const user = req.user;
    if (!user) {
        res.render('about.hbs');
    } else {
        res.render('about.hbs', { user });
    }
}

function getCreate(req, res) {
    let user = req.user;
    res.render('create.hbs', { user })
}

function postCreate(req, res) {
    const user = req.user;
    const { name = null, description = null, imageUrl = null, difficultyLevel = null } = req.body;
    let creatorId = user.id;
    models.cubeModel.create({ name, description, imageUrl, difficultyLevel, creatorId }).then(cube => {
        res.redirect('/')
    }).catch(err => {
        if (err.name === 'ValidationError') {
            res.render('create.hbs', {
                user, errors: err.errors
            });
            return;
        }
        next(err);
    });
}

function getDetails(req, res, next) {
    const user = req.user;
    const cubeId = req.params.id;
    if (!user) {
        models.cubeModel.findById(cubeId).populate('accessories').populate('creatorId')
            .then(cube => {
                res.render('details.hbs', { user, cube });
            }).catch(next);
    } else {
        models.cubeModel.findById(cubeId).populate('accessories').populate('creatorId')
            .then(cube => {
                if (cube.creatorId.id == user.id) {
                    const creator = true;
                    res.render('details.hbs', { user, creator, cube });
                } else {
                    res.render('details.hbs', { user, cube });
                }
            }).catch(next);
    }
}

function getEdit(req, res, next) {
    const user = req.user;
    const cubeId = req.params.id;

    models.cubeModel.findOne({ _id: cubeId })
        .then(cube => {
            const options = [
                { title: '1 - Very Easy', selected: 1 === cube.difficultyLevel, value: 1 },
                { title: '2 - Easy', selected: 2 === cube.difficultyLevel, value: 2 },
                { title: '3 - Medium (Standard 3x3)', selected: 3 === cube.difficultyLevel, value: 3 },
                { title: '4 - Intermediate', selected: 4 === cube.difficultyLevel, value: 4 },
                { title: '5 - Expert', selected: 5 === cube.difficultyLevel, value: 5 },
                { title: '6 - Hardcore', selected: 6 === cube.difficultyLevel, value: 6 }
            ];
            res.render('editCube.hbs', { user, cube, options })
        }).catch(next)
}

function postEdit(req, res) {
    const user = req.user;
    const cubeId = req.params.id;
    const { name = null, description = null, imageUrl = null, difficultyLevel = null } = req.body;
    models.cubeModel.findOneAndUpdate({ _id: cubeId }, { name, description, imageUrl, difficultyLevel }, { runValidators: true })
        .then(cube => {
            res.redirect('/')
        }).catch(err => {
            if (err.name === 'ValidationError') {
                res.render('editCube.hbs', {
                    user, errors: err.errors
                });
                return;
            }
            next(err);
        });
}

function getDelete(req, res, next) {
    let user = req.user;
    let cubeId = req.params.id;
    models.cubeModel.findOne({ _id: cubeId })
        .then(cube => {
            const options = [
                { title: '1 - Very Easy', selected: 1 === cube.difficultyLevel, value: 1 },
                { title: '2 - Easy', selected: 2 === cube.difficultyLevel, value: 2 },
                { title: '3 - Medium (Standard 3x3)', selected: 3 === cube.difficultyLevel, value: 3 },
                { title: '4 - Intermediate', selected: 4 === cube.difficultyLevel, value: 4 },
                { title: '5 - Expert', selected: 5 === cube.difficultyLevel, value: 5 },
                { title: '6 - Hardcore', selected: 6 === cube.difficultyLevel, value: 6 }
            ];
            res.render('deleteCube.hbs', { user, cube, options })
        }).catch(next)
}

function postDelete(req, res,next) {
    const user = req.user;
    const cubeId = req.params.id;

    Promise.all([
        models.accessoryModel.updateMany({ cubes: { $in: cubeId } }, { $pull: {cubes : cubeId } }),
        models.cubeModel.findOneAndDelete({ _id: cubeId })
    ]).then(() => {
        res.redirect('/')
    }).catch(next)
}
module.exports = {
    index,
    about,
    getCreate,
    postCreate,
    getDetails,
    getEdit,
    postEdit,
    getDelete,
    postDelete
};

