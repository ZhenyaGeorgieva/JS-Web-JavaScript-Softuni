const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  facultyNumber: Number,
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }]
});

module.exports = mongoose.model('Student', studentSchema);



