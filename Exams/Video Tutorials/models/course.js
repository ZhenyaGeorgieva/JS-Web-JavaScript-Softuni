const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        validate: [
            {
                validator: function (v) {
                    return v.length > 5;
                },
                message: props => `${props.value} should be at least 5 chars long!`
            },
            {
                validator: function (v) {
                    return /[a-zA-Z0-9\s]+/.test(v);
                },
                message: props => `${props.value} is not a valid course name!`
            }
        ]
    },
    description: {
        type: String,
        required: true,
        validate: [
            {
                validator: function (v) {
                    return v.length < 50;
                },
                message: props => `${props.value} should be max 50 chars long!`
            },
            {
                validator: function (v) {
                    return /[a-zA-Z0-9\s]+/.test(v);
                },
                message: props => `${props.value} is not a valid course description!`
            }
        ]
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [
            {
                validator: function (v) {
                    return v.startsWith('http:') || v.startsWith('https:');
                },
                message: props => `${props.value} should be vali url!`
            }
        ]
    },
    public: {
        type: Boolean,
        default: false
    },
    lectures: [{ type: mongoose.Types.ObjectId, ref: 'Lecture' }],
    users: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
});


module.exports = mongoose.model('Course', courseSchema);
