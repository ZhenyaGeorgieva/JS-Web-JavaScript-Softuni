// TODO: Require Controllers...
const teamController = require('../controllers/team');
const projectController = require('../controllers/project');
const authController = require('../controllers/auth');
const { auth } = require('../utils');


module.exports = (app) => {
    app.post('/leave/:id', auth(), teamController.leaveTeam);
    app.post('/teams', auth(), teamController.postManageTeams);
    app.get('/teams', auth(), teamController.getManageTeams);
    app.post('/projects', auth(), projectController.postManageProjects);
    app.get('/projects', auth(), projectController.getManageProjects);
    app.post('/createProject', auth(), projectController.postCreateProject);
    app.get('/createProject', auth(), projectController.getCreateProject);
    app.post('/createTeam', auth(), teamController.postCreateTeam);
    app.get('/createTeam', auth(), teamController.getCreateTeam);
    app.get('/profile/:id', auth(), teamController.showProfile)
    app.get('/logout', authController.logout);
    app.get('/login', authController.login);
    app.get('/register', authController.register);
    app.post('/login', authController.loginPost);
    app.post('/register', authController.registerPost);
    app.get('/', auth(false), teamController.index);//ако няма логнат user не се препраща към логин
    app.get('*', auth(false), (req, res) => { const user = req.user; res.render('404.hbs', { user }); });
};
