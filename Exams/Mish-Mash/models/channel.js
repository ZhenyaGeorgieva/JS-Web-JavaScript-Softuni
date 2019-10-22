const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    name: {
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
    type: {
        type: String,
        required: true,
        enum: ['Game', 'Motivation', 'Lessons', 'Radio', 'Other'],
        validate: [
            {
                validator: function (v) {
                    return v == 'Game' || v == 'Motivation' || v == 'Lessons' || v == 'Radio' || v == 'Other';
                },
                message: props => `${props.value} could be Game/Motivation/Lessons/Radio/Other only!`
            }
        ]
    },
    tags: [{
        type: 'String'
    }],
    followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
});


module.exports = mongoose.model('Channel', channelSchema);
