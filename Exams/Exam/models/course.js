const mongoose = require('mongoose');

// const courseSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   description: {
//     type: String,
//     required: true

//   },
//   imageUrl: {
//     type: String,
//     required: true
//   },
//   isPublic: {
//     type: Boolean,
//     default: false
//   },
//   createdAt: {
//     type: mongoose.SchemaTypes.Date,
//     default:Date.now,
//     required: true
//   },
//   users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
//   creatorId: { type: mongoose.Types.ObjectId, ref: 'User' }
// });

module.exports = mongoose.model('Course', courseSchema);

// const articleSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   description: {
//     type: String,
//     required: true

//   },
//   creationDate: {
//     type: Date,
//     required: true,
//     default:Date.now
//   },
//   articleAuthor: { type: mongoose.Types.ObjectId, ref: 'User' }
// });

// module.exports = mongoose.model('Article', articleSchema);

