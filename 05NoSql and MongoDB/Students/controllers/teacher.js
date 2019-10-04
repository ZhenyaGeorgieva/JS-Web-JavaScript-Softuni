const teacherModel = require('../models/teacher');

function postCreate(req, res) {
  const { name = null, imageUrl=null, experience=null} = req.body;
  teacherModel.create({name,imageUrl,experience}).then((teacher) => {
    console.log(teacher);
    res.redirect('/getTeachers');
  });
}

function getCreate(req, res) {
  res.render('createTeacher.hbs');
}

function getTeachers(req, res) {
    teacherModel.find().then((teachers) => {
        res.render('teachers.hbs', {teachers})
    });
  }

module.exports = {
  getCreate,
  postCreate,
  getTeachers
};

