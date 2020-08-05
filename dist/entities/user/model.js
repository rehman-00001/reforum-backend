"use strict";

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  fullName: String,
  email: String,
  avatarUrl: String,
  city: String,
  password: String
});
module.exports = mongoose.model('user', userSchema);
//# sourceMappingURL=model.js.map