const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  fullName: String,
  email: String,
  avatarUrl: String,
  city: String,
  password: String,
});

module.exports = mongoose.model('user', userSchema);
