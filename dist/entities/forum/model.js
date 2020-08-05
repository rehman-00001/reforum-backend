"use strict";

/**
 * forum model
 */
var mongoose = require('mongoose');

var forumSchema = mongoose.Schema({
  forum_slug: String,
  forum_name: String
});
module.exports = mongoose.model('forum', forumSchema);
//# sourceMappingURL=model.js.map