const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate:[
      {
        validator:function(v){
          return v.length>5;
        },
        message: props=>`${props.value} should be at least 5 chars long!`
      },
      {
        validator: function (v) {
          return /[a-zA-Z0-9\s]+/.test(v);
        },
        message: props => `${props.value} is not a valid team name!`
      }
    ]
  },
  projects: [{ type: mongoose.Types.ObjectId, ref: 'Project' }],
  members: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Team', teamSchema);


