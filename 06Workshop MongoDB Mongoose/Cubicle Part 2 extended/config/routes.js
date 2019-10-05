// TODO: Require Controllers...
const cubeController = require('../controllers/cube');
const accessoryController = require('../controllers/accessory');

module.exports = (app) => {
    app.post('/attach/:id', cubeController.postAttachAccessory);
    app.get('/attach/:id', cubeController.getAttachAccessory);
    app.post('/create/accessory', accessoryController.postCreate);
    app.get('/create/accessory', accessoryController.getCreate);
    app.get('/details/:id', cubeController.details)
    app.get('/about', cubeController.about);
    app.get('/not-found', cubeController.notFound);
    app.get('/create', cubeController.getCreate);
    app.post('/create', cubeController.postCreate);
    app.get('/', cubeController.index);
    app.use('*',cubeController.notFound);
};