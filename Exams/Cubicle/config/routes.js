// TODO: Require Controllers...
const cubeController = require('../controllers/cube');
const accessoryController = require('../controllers/accessory');
const authController = require('../controllers/auth');
const { auth } = require('../utils');


module.exports = (app) => {
    app.post('/delete/:id', auth(), cubeController.postDelete);
    app.get('/delete/:id', auth(), cubeController.getDelete);
    app.post('/addAccessory/:id', auth(), accessoryController.addAccessoryPost);
    app.get('/addAccessory/:id', auth(), accessoryController.addAccessoryGet);
    app.post('/edit/:id', auth(), cubeController.postEdit);
    app.get('/edit/:id', auth(), cubeController.getEdit);
    app.get('/details/:id', auth(false), cubeController.getDetails);
    app.post('/create/accessory', auth(), accessoryController.postCreate);
    app.get('/create/accessory', auth(), accessoryController.getCreate);
    app.post('/create', auth(), cubeController.postCreate);
    app.get('/create', auth(), cubeController.getCreate);
    app.get('/about', auth(false), cubeController.about);
    app.get('/logout', authController.logout);
    app.get('/login', authController.login);
    app.get('/register', authController.register);
    app.post('/login', authController.loginPost);
    app.post('/register', authController.registerPost);
    app.get('/', auth(false), cubeController.index);//ако няма логнат user не се препраща към логин
    app.get('*', auth(false), (req, res) => {
        const user = req.user; res.render('404.hbs', { user });
    });
};

// app.get('/createTeam', auth(), teamController.getCreateTeam);
// app.get('/profile/:id', auth(), teamController.showProfile)
// app.get('/logout', authController.logout);
// app.get('/login', authController.login);
// app.get('/register', authController.register);
// app.post('/login', authController.loginPost);
// app.post('/register', authController.registerPost);
// app.post('/leave/:id', auth(), teamController.leaveTeam);
// app.post('/teams', auth(), teamController.postManageTeams);
// app.get('/teams', auth(), teamController.getManageTeams);
// app.post('/projects', auth(), projectController.postManageProjects);
// app.get('/projects', auth(), projectController.getManageProjects);
// app.post('/createProject', auth(), projectController.postCreateProject);
// app.get('/createProject', auth(), projectController.getCreateProject);
// app.post('/createTeam', auth(), teamController.postCreateTeam);