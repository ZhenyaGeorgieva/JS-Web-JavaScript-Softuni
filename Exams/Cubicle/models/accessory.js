const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
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
        message: props => `${props.value} is not a valid accessory name!`
      }
    ]
  },
  description:{
    type: String,
    required: true,
    validate:[
      {
        validator:function(v){
          return v.length<=50;
        },
        message: props=>`${props.value} should be maximum 50 symbols long!`
      },
      {
        validator: function (v) {
          return /[a-zA-Z0-9\s]+/.test(v);
        },
        message: props => `${props.value} is not a valid accessory name - only English letters,digits and spaces!`
      }
    ]
  },
  imageUrl:{
    type: String,
    required: true,
    validate:[
      {
        validator:function(v){
          return v.startsWith('http:')||v.startsWith('https:');
        },
        message: props=>`${props.value} should start with http ot https!`
      },
    ]
  },
  cubes: [{ type: mongoose.Types.ObjectId, ref: 'Cube' }]
});

module.exports = mongoose.model('Accessory', accessorySchema);


