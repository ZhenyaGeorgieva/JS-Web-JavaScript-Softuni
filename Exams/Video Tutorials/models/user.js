const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [4,'Username should be at least 4 characters!'],
    validate: [
      {
        validator: function (v) {
          return /[a-zA-Z0-9]+/.test(v);
        },
        message: props => `${props.value} is not a valid username!`
      },
    ]
  },
  password: {
    type: String,
    required: true,
    minlength: [4, 'Password should be at least 4 characters!'],
    validate: [
      {
        validator: function (v) {
          return /[a-zA-Z0-9]+/.test(v);
        },
        message: props => `${props.value} is not a valid username!`
      }
    ]
  },
  courses:[{ type: mongoose.Types.ObjectId, ref: 'Course' }],
  roles:String
});

userSchema.methods = {
  matchPassword: function (password) {
    return bcrypt.compare(password, this.password);
  }
};

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) { next(err); return; }
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) { next(err); return; }
        this.password = hash;
        next();
      });
    });
    return;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
