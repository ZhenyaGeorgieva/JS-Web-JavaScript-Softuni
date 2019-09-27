// TODO: Require Controllers...
const homeController = require('../controllers/home');
const aboutController = require('../controllers/about');
const cubeController = require('../controllers/cube');
const url = require('url');

module.exports = (app) => {
    // TODO...
    app.get('/', homeController.homeGet)
    app.get('/about', aboutController.aboutGet);
    app.get('/create', cubeController.createGet);
    app.get('/details/:id', cubeController.detailsGet);
};