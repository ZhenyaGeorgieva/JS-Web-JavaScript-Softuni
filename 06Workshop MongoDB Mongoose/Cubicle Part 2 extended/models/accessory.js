const mongoose = require('mongoose');

const accessoriesSchema = new mongoose.Schema({
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
  description: String,
  imageUrl: String,
  cubes:[{
    type: mongoose.Types.ObjectId,//mongoose.Types.ObjectId;
    ref: 'Cubes'
  }]
});

module.exports = mongoose.model('Accessories', accessoriesSchema);
