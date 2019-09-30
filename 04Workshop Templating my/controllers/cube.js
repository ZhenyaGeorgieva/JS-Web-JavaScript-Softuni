const cubeModel = require('../models/cube');

function index(req, res, next) {
    const { from, to, search } = req.body;
    const findFn = item => {
        let result = true;
        if (search) {
            result = item.name.includes(search);
        }
        if (result && from) {
            result = Number(item.difficultyLevel) >= Number(from);
        }
        if (result && to) {
            result = Number(item.difficultyLevel) <= Number(to);
        }
        return result;
    }
    cubeModel.find(findFn).then(cubes => {
        res.render('index.hbs', { cubes, search, from, to });
    }).catch(next);
}

function details(req, res, next) {
    const id = Number(req.params.id);
    cubeModel.getOne(id).then(cube => {
        if (!cube) {
            res.redirect('/not-found');
            return;
        }
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
    const newCube = cubeModel.create(name, description, imageUrl, difficultyLevel);
    console.log(newCube)
    cubeModel.insert(newCube).then(() => {
        res.redirect('/')
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