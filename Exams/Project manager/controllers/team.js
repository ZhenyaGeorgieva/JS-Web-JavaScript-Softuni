const models = require('../models');

function index(req, res) {
  const user = req.user;
  if (!user) {
    res.render('index.hbs');
  }
  else if (user.roles == 'user') {
    res.render('index.hbs', { user });
  } else {
    let admin = user;
    res.render('index.hbs', { admin });
  }
}

function showProfile(req, res, next) {
  const id = req.params.id;
  const user = req.user;

  models.userModel.findOne({ _id: id }).populate('teams')
    .then(user => {
      let teams2 = user.teams.map(x => x.id)
      Promise.all([user, models.projectModel.find({ team: { $in: teams2 } })])
        .then(([user, projects]) => {
          if (user.role == 'admin') {
            let admin=user;
            res.render('profile.hbs',{admin,user,projects})
          }else{
            res.render('profile.hbs',{user,projects})
          }
        }).catch(next)
    }).catch(next)
}


function getCreateTeam(req, res) {
  let admin = req.user;
  res.render('createTeam.hbs', { admin })
}

function postCreateTeam(req, res) {
  const { name = null } = req.body;
  let admin = req.user;
  models.teamModel.create({ name }).then(team => {
    res.redirect('/')
  }).catch(err => {
    if (err.name === 'ValidationError') {
      res.render('createTeam.hbs', {
        admin, errors: err.errors
      });
      return;
    }
    next(err);
  });
}

function getManageTeams(req, res, next) {
  const user = req.user;
  if (user.roles == 'admin') {
    let admin = user;

    Promise.all([
      models.userModel.find(),
      models.teamModel.find()])
      .then(([users, teams]) => {
        res.render('teams-admin.hbs', {
          admin,
          users,
          teams
        });
      }).catch(next);
  } else {
    models.teamModel.find().populate('projects').populate('members')
      .then(teams => {
        res.render('teams-user.hbs', { user, teams })
      })
  }
}

function postManageTeams(req, res, next) {
  const user = req.user;
  if (user.roles == 'admin') {
    let admin = req.user
    const { user, team } = req.body;
    Promise.all([
      models.userModel.findOneAndUpdate({ _id: user, teams: { $nin: team } }, { $push: { teams: team } }),
      models.teamModel.findOneAndUpdate({ _id: team, members: { $nin: user } }, { $push: { members: user } })
    ]).then(([user, team]) => {
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

function leaveTeam(req,res,next){
  const user = req.user;
  const teamId=req.params.id;

  Promise.all([
    models.userModel.findOneAndUpdate({_id:user.id},{$pull:{teams:teamId}}),
    models.teamModel.findByIdAndUpdate({_id:teamId},{$pull:{members:user.id}})
  ]).then(()=>{
    res.redirect(`/profile/${user.id}`)
  }).catch(next)
}

module.exports = {
  index,
  showProfile,
  getCreateTeam,
  postCreateTeam,
  getManageTeams,
  postManageTeams,
  leaveTeam
};