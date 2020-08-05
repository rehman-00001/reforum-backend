"use strict";

/**
 * discussion model
 */
var mongoose = require('mongoose');

var discussionSchema = mongoose.Schema({
  content: Object,
  date: Date,
  discussion_slug: String,
  favorites: Array,
  forum: {
    type: mongoose.Schema.ObjectId,
    ref: 'forum'
  },
  forum_id: mongoose.Schema.ObjectId,
  pinned: Boolean,
  tags: Array,
  title: String,
  user_id: mongoose.Schema.ObjectId,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user'
  }
});
module.exports = mongoose.model('discussion', discussionSchema);
//# sourceMappingURL=model.js.map