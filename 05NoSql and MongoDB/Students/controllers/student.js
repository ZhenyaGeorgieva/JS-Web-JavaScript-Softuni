const studentModel = require('../models/student');
const teacherModel = require('../models/teacher');

function index(req, res, next) {
  studentModel.find().then(student => {
    res.render('index.hbs', { student });
  }).catch(next);
}

function getDetails(req, res, next) {
  const id = req.params.id;
  console.log(req.params)
  studentModel.findById(id).populate('teacher').then(student => {
    if (!student) { res.redirect('/not-found'); return; }
    res.render('details.hbs', student);
  }).catch(next);
}

function notFound(req, res) {
  res.render('404.hbs');
}


function postCreate(req, res) {
  const { name = null, imageUrl = null, facultyNumber = null, teacher = null } = req.body;
  teacherModel.findOne({ 'name': teacher }).select('_id').then(id => {
    studentModel.create({ name, imageUrl, facultyNumber, teacher: id }).then(student => {
      console.log(student);
      res.redirect('/');
    });
  });
}

function getCreate(req, res) {
  teacherModel.find().then((teachers) => {
    res.render('create.hbs', { teachers });
  });
}

function getChangeTeacher(req, res, next) {
  const id = req.params.id;
  console.log(req.params)
  studentModel.findById(id).populate('teacher').then(student => {
    if (!student) { res.redirect('/not-found'); return; }
    teacherModel.find().then(teachers => {
      res.render('changeTeacher.hbs', { student, teachers });
    });
  }).catch(next);
}

function postChangeTeacher(req, res) {
  const studentId = req.params.id;
  const { name = null } = req.body;
  teacherModel.findOne({ name }).select('_id')
    .then(id => {
      studentModel.findByIdAndUpdate(studentId, { teacher: id }, () => {
        res.redirect('/')
      })
    })
}

function getDeleteStudent(req, res) {
  const studentId = req.params.id;
  studentModel.findByIdAndRemove(studentId, () => {
    res.redirect('/')
  })
}

module.exports = {
  index,
  getCreate,
  postCreate,
  getDetails,
  notFound,
  getChangeTeacher,
  postChangeTeacher,
  getDeleteStudent
};

