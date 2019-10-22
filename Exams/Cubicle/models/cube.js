const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
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
          return v.length<=50;
        },
        message: props=>`${props.value} should be maximum 50 symbols long!`
      },
      {
        validator: function (v) {
          return /[a-zA-Z0-9\s]+/.test(v);
        },
        message: props => `${props.value} is not a valid cube name - only English letters,digits and spaces!`
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
  difficultyLevel:{
    type:Number,
    required: true,
    enum: [1, 2,3,4,5,6],
    validate: [
        {
            validator: function (v) {
                return v == 1 || v == 2 || v == 3 || v == 4 || v == 5 ||v==6;
            },
            message: props => `${props.value} could be number from one to six only!`
        }
    ]
  },
  accessories:[{ type: mongoose.Types.ObjectId, ref: 'Accessory'}],
  creatorId:{ type: mongoose.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Cube', cubeSchema);
