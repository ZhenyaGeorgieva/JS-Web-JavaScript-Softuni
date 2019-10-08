const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // validate: {
    //   validator: function(v){
    //     return /\d{3}-\d{3}-\d{3}/.test(v);
    //   },
    //   message: props=>`${props.value} is not a valid phone number!`
    // },
  },
  description: {
    type: String,
    required: true,
    validate: {
      validator: function () {
        return this.description.length <= 20;
      },
      message: 'Description must be less than 20 symbols long!'
    }
  },
  imageUrl: String,
  difficultyLevel: Number,
  accessories: [{
    type: mongoose.Types.ObjectId,
    ref: 'Accessories'
  }]
});

module.exports = mongoose.model('Cube', cubeSchema);

