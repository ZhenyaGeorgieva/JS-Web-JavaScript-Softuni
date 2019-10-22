// TODO: Require Controllers...
const channelController = require('../controllers/channel');
const authController = require('../controllers/auth');
const { auth } = require('../utils');


module.exports = (app) => {
    app.get('/unfollow/:id', auth(), channelController.unfollow);
    app.get('/followed', auth(), channelController.followed);
    app.get('/details/:id', auth(), channelController.details);
    app.get('/follow/:id', auth(), channelController.follow);
    app.get('/create', auth(), channelController.createGet);
    app.post('/create', auth(), channelController.createPost);
    app.get('/logout', authController.logout);
    app.post('/register', authController.registerPost);
    app.get('/register', authController.registerGet);
    app.post('/login', authController.loginPost);
    app.get('/login', authController.loginGet);
    app.get('/', auth(false), channelController.index);
    app.get('*', auth(false), (req, res) => { const user = req.user; res.render('404.hbs', { user }); });
};
