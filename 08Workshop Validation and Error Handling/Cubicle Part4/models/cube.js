const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
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
        message: props => `${props.value} is not a valid cube name!`
      }
    ]
  },
  description: {
    type: String,
    required: true,
    validate:[
      {
        validator:function(v){
          return v.length>20;
        },
        message: props=>`${props.value} should be at least 20 chars long!`
      },
      {
        validator: function (v) {
          return /[a-zA-Z0-9\s]+/.test(v);
        },
        message: props => `${props.value} is not a valid cube description!`
      }
    ]
  },
  imageUrl: {
    type: String,
    required: true,
    validate:[
      {
        validator:function(v){
          return v.startsWith('http://')||v.startsWith('https://');
        },
        message: props=>`${props.value} should be referring to actual picture!`
      }
    ]
  },
  difficultyLevel: Number,
  accessories: [{ type: mongoose.Types.ObjectId, ref: 'Accessories' }],
  creatorId: { type: mongoose.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Cube', cubeSchema);
// const mongoose = require('mongoose');

// const cubeSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     // validate: {
//     //   validator: function(v){
//     //     return /\d{3}-\d{3}-\d{3}/.test(v);
//     //   },
//     //   message: props=>`${props.value} is not a valid phone number!`
//     // },
//   },
//   description: {
//     type: String,
//     required: true,
//     validate: {
//       validator: function () {
//         return this.description.length <= 20;
//       },
//       message: 'Description must be less than 20 symbols long!'
//     }
//   },
//   imageUrl: String,
//   difficultyLevel: Number,
//   accessories: [{
//     type: mongoose.Types.ObjectId,
//     ref: 'Accessories'
//   }],
//   creatorId:{
//     type: mongoose.Types.ObjectId,
//     ref: 'User'
//   }
// });

// module.exports = mongoose.model('Cube', cubeSchema);

