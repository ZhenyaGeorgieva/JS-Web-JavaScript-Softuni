const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  description:{
    type: String,
    required: true,
    validate:[
      {
        validator:function(v){
          return v.length<50;
        },
        message: props=>`${props.value} should be maximum 50 symbols long!`
      },
      {
        validator: function (v) {
          return /[a-zA-Z0-9\s]+/.test(v);
        },
        message: props => `${props.value} is not a valid team name!`
      }
    ]
  },
  team:{ type: mongoose.Types.ObjectId, ref: 'Team' }
});

module.exports = mongoose.model('Project', projectSchema);
