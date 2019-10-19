const models = require('../models');

function getCreateProject(req, res) {
  let admin = req.user;
  res.render('createProject.hbs', { admin })
}

function postCreateProject(req, res) {
  const { name = null, description = null } = req.body;
  let admin = req.user;
  models.projectModel.create({ name, description }).then(project => {
    res.redirect('/')
  }).catch(err => {
    if (err.name === 'ValidationError') {
      res.render('createProject.hbs', {
        admin, errors: err.errors
      });
      return;
    }
    next(err);
  });
}

function getManageProjects(req, res, next) {
  const user = req.user;
  if (user.roles == 'admin') {
    let admin = user;

    Promise.all([
      models.teamModel.find(),
      models.projectModel.find({ team: { $exists: false } })])
      .then(([teams, projects]) => {
        res.render('projects-admin.hbs', {
          admin,
          teams,
          projects
        });
      }).catch(next);
  } else {
    models.projectModel.find().populate('team').then(projects => {
      res.render('projects-user.hbs', {
        user,
        projects
      });
    }).catch(next)
  }
}

function postManageProjects(req, res, next) {
  const user = req.user;
  if (user.roles == 'admin') {
    let admin = user;
    const { team, project } = req.body;
    Promise.all([
      models.projectModel.findOneAndUpdate({ _id: project }, { team: team }),
      models.teamModel.findOneAndUpdate({ _id: team }, { $push: { projects: project } })
    ]).then(([project, team]) => {
      res.redirect('/')
    }).catch(err => {
      if (err.name === 'ValidationError') {
        res.render('create.hbs', {
          admin, errors: err.errors
        });
        return;
      }
      next(err);
    });
  }
}

module.exports = {
  getCreateProject,
  postCreateProject,
  getManageProjects,
  postManageProjects
};
