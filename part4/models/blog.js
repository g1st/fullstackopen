const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: String }]
});

blogSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret.__v;
    delete ret._id;
  }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
