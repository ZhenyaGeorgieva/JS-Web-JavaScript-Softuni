
const courseController = require('../controllers/course');
const authController = require('../controllers/auth');
const { auth } = require('../utils');
const courseValidator = require('../utils/validator');
const userValidator = require('../utils/validatorUser')


module.exports = (app) => {

}

// app.post('/edit/:id', auth(), courseValidator, courseController.postEdit);
// app.get('/edit/:id', auth(), courseController.getEdit);
// app.get('/delete/:id', auth(), courseController.deleteCourse);
// app.get('/enroll/:id', auth(), courseController.enroll);
// app.get('/details/:id', auth(), courseController.getDetails);
// app.post('/course/create', auth(), courseValidator, courseController.postCreate);
// app.get('/course/create', auth(), courseController.getCreate);
// app.get('/logout', authController.logout);
// app.post('/login', authController.loginPost);
// app.get('/login', authController.loginGet);
// app.post('/register', userValidator, authController.registerPost);
// app.get('/register', userValidator, authController.registerGet);
// app.get('/', auth(false), courseController.index);//ако няма логнат user не се препраща към логин
// app.get('*', auth(false), (req, res) => {
//     const user = req.user; res.render('404.hbs', { user });
// })
