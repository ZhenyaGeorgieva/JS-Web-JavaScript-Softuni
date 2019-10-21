const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    videoUrl: {
        type: String,
        required: true,
        validate: [
            {
                validator: function (v) {
                    return v.startsWith('http:') || v.startsWith('https:');
                },
                message: props => `${props.value} should be valid url!`
            }
        ]
    },
    course: { type: mongoose.Types.ObjectId, ref: 'Course' }
});

module.exports = mongoose.model('Lecture', lectureSchema);

