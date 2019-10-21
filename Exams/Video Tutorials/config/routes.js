// TODO: Require Controllers...
const courseController = require('../controllers/course');
const lectureController = require('../controllers/lecture');
const authController = require('../controllers/auth');
const { auth } = require('../utils');


module.exports = (app) => {
    app.get('/details/play/:id', auth(), lectureController.play);
    app.get('/enrollCourse/:id', auth(), courseController.enroll);
    app.get('/details/:id', auth(), courseController.details);
    app.get('/deleteLecture/:id', auth(), lectureController.deleteLecture);
    app.post('/addLecture/:id', auth(), lectureController.addLecturePost);
    app.get('/addLecture/:id', auth(), lectureController.addLectureGet);
    app.post('/editCourse/:id', auth(), courseController.editCoursePost);
    app.get('/editCourse/:id', auth(), courseController.editCourseGet);
    app.get('/createCourse', auth(), courseController.createGet);
    app.post('/createCourse', auth(), courseController.createPost)
    app.get('/logout', authController.logout);
    app.post('/register', authController.registerPost);
    app.get('/register', authController.registerGet);
    app.post('/login', authController.loginPost);
    app.get('/login', authController.loginGet);
    app.get('/', auth(false), courseController.index);//ако няма логнат user не се препраща към логин
    app.get('*', auth(false), (req, res) => { const user = req.user; res.render('404.hbs', { user }); });
};
