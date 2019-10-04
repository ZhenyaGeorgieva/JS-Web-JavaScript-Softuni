// TODO: Require Controllers...
const studentController = require('../controllers/student');
const teacherController = require('../controllers/teacher');

module.exports = (app) => {
    app.get('/delete/:id', studentController.getDeleteStudent)
    app.post('/changeTeacher/:id', studentController.postChangeTeacher)
    app.get('/changeTeacher/:id', studentController.getChangeTeacher)
    app.get('/getTeachers', teacherController.getTeachers);
    app.get('/details/:id', studentController.getDetails);
    app.get('/createTeacher', teacherController.getCreate);
    app.post('/createTeacher', teacherController.postCreate);
    app.get('/createStudent', studentController.getCreate);
    app.post('/createStudent', studentController.postCreate);
    app.get('/', studentController.index);
};