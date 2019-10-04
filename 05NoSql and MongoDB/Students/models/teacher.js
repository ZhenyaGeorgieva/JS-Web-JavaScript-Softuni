const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: String,
  imageUrl:String,
  experience:String
});

module.exports = mongoose.model('Teacher', teacherSchema); 