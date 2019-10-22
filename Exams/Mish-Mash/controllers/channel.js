const models = require('../models');

async function index(req, res, next) {
  const currentUser = req.user;

  try {
    if (!currentUser) {
      res.render('index.hbs');
    } else if (currentUser.roles == 'user') {
      let user = await models.userModel.findOne({ _id: currentUser.id }).populate('channels');
      let currentUserTags = [];
      for (const channel of user.channels) {
        for (const tag of channel.tags) {
          currentUserTags.push(tag)
        }
      }
      let suggestedChannels = await models.channelModel.find({ tags: { $in: currentUserTags },followers:{$nin:user} });
      let channels = await models.channelModel.find({ tags: { $nin: currentUserTags },followers:{$nin:user} })
      res.render('index.hbs', { user, suggestedChannels, channels })
    }
    else {
      let admin = currentUser;
      let user = await models.userModel.findOne({ _id: currentUser.id }).populate('channels');
      let currentUserTags = [];
      for (const channel of user.channels) {
        for (const tag of channel.tags) {
          currentUserTags.push(tag)
        }
      }
      let suggestedChannels = await models.channelModel.find({ tags: { $in: currentUserTags },followers:{$nin:user} });
      let channels = await models.channelModel.find({ tags: { $nin: currentUserTags },followers:{$nin:user} })
      res.render('index.hbs', { admin, user, suggestedChannels,channels });
    }
  } catch (e) {
    next(e)
  }
}


function createGet(req, res, next) {
  let admin = req.user;
  res.render('channel-create.hbs', { admin })
}

function createPost(req, res, next) {
  let { name = null, description = null, tags, inlineRadioOptions } = req.body;
  tags = tags.split(', ');
  let type = inlineRadioOptions;

  console.log(inlineRadioOptions);

  models.channelModel.create({ name, description, tags, type }).then(channel => {
    res.redirect('/')
  }).catch(err => {
    if (err.name === 'ValidationError') {
      let admin = req.user;
      res.render('channel-create.hbs', {
        admin, errors: err.errors
      });
      return;
    }
    next(err);
  });
}

function follow(req, res, next) {
  let user = req.user;
  let channelId = req.params.id;

  Promise.all([
    models.channelModel.findOneAndUpdate({ _id: channelId }, { $addToSet: { followers: user._id } }),
    models.userModel.findOneAndUpdate({ _id: user.id }, { $addToSet: { channels: channelId } })
  ]).then(() => {
    res.redirect('/')
  }).catch(next)
}

function details(req, res, next) {
  let channelId = req.params.id;
  const user = req.user;

  models.channelModel.findOne({ _id: channelId }).populate('followers')
    .then(channel => {
      if (user.roles == 'admin') {
        let admin = user;
        res.render('channel-details.hbs', { admin, channel })
      } else {
        res.render('channel-details', { channel })
      }
    }).catch(next)
}
function followed(req, res, next) {
  let channelId = req.params.id;
  const user = req.user;

  models.channelModel.find({ followers: { $in: user } }).populate('users')
    .then(channels => {
      if (user.roles == 'admin') {
        let admin = user;
        res.render('followed-channels.hbs', { admin, channels })
      } else {
        res.render('followed-channels', { channels })
      }
    }).catch(next)
}

function unfollow(req, res, next) {
  let user = req.user;
  let channelId = req.params.id;

  Promise.all([
    models.channelModel.findOneAndUpdate({ _id: channelId }, { $pull: { followers: user.id } }),
    models.userModel.findOneAndUpdate({ _id: user.id }, { $pull: { channels: channelId } })
  ]).then(([channel, user]) => {
    res.redirect('/')
  }).catch(next)
}



module.exports = {
  index,
  createGet,
  createPost,
  follow,
  details,
  followed,
  unfollow
};

