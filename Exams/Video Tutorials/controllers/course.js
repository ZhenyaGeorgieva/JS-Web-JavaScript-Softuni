const models = require('../models');

function index(req, res, next) {
  const user = req.user;
  if (!user) {
    models.courseModel.find({ public: true }).populate('users').limit(3)
      .then(courses => {
        courses = courses.sort((a, b) => b.users.length - a.users.length);
        res.render('index.hbs', { courses });
      }).catch(next);
  }
  else if (user.roles == 'user') {
    models.courseModel.find({ public: true }).sort({ users: -1 })
      .then(courses => {
        res.render('index.hbs', { user, courses });
      }).catch(next);
  } else {
    let admin = user;
    models.courseModel.find().then(courses => {
      res.render('index.hbs', { admin, courses });
    }).catch(next)

  }
}

function createGet(req, res, next) {
  let admin = req.user;
  res.render('course-create.hbs', { admin })
}

function createPost(req, res, next) {
  const { title = null, description = null, imageUrl = null } = req.body;
  let public;
  if (req.body.type == 'on') {
    public = true;
  }
  const { user } = req;
  models.courseModel.create({ title, description, imageUrl, public }).then(course => {
    res.redirect('/')
  }).catch(err => {
    if (err.name === 'ValidationError') {
      res.render('course-create.hbs', {
        user, errors: err.errors
      });
      return;
    }
    next(err);
  });
}
function editCourseGet(req, res, next) {
  let admin = req.user;
  const id = req.params.id;

  models.courseModel.findOne({ _id: id }).then(course => {
    res.render('course-edit.hbs', { admin, course });
  }).catch(next);
}

function editCoursePost(req, res, next) {
  const id = req.params.id;
  const { title = null, description = null, imageUrl = null } = req.body;
  let public = false;
  if (req.body.public == 'on') {
    public = true;
  }
  const { user } = req;
  models.courseModel.updateOne({ _id: id }, { title, description, imageUrl, public }, { runValidators: true })
    .then(course => { res.redirect('/') })
    .catch(err => {
      if (err.name === 'ValidationError') {
        models.courseModel.findOne({ _id: id }).then(course => {
          res.render('course-edit.hbs', { course, errors: err.errors });
        })
        return;
      }
      next(err);
    });
}

function details(req, res, next) {
  let user = req.user;
  let courseId = req.params.id;

  models.courseModel.findOne({ _id: courseId, users: { $in: user } }).populate('lectures')
    .then(course => {
      if (!course) {
        models.courseModel.findOne({ _id: courseId }).then(course => {
          res.render('details.hbs', { user, course })
        }).catch(next)
      } else {
        res.render('details.hbs', { user, enrolled: true, course })
      }
    }).catch(next)
}

function enroll(req, res, next) {
  let user = req.user;
  let courseId = req.params.id;

  Promise.all([
    models.courseModel.findOneAndUpdate({ _id: courseId }, { $addToSet: { users: user._id } }),
    models.userModel.findOneAndUpdate({ _id: user.id }, { $addToSet: { courses: courseId } })
  ]).then(() => {
    res.redirect('/')
  }).catch(next)
}

module.exports = {
  index,
  createGet,
  createPost,
  editCourseGet,
  editCoursePost,
  details,
  enroll
};

