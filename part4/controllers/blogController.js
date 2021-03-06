const blogRouter = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', 'username name id');
    response.json(blogs.map(blog => blog.toJSON()));
  } catch (e) {
    next(e);
  }
});

blogRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params;
  try {
    const blog = await Blog.findOne({ _id: id }).populate(
      'user',
      'username name id'
    );
    response.json(blog.toJSON());
  } catch (e) {
    next(e);
  }
});

blogRouter.post('/', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    const user = await User.findById(decodedToken.id);
    const blog = new Blog({
      ...request.body,
      user: mongoose.Types.ObjectId(decodedToken.id)
    });
    let savedBlog = await blog.save();
    savedBlog = await savedBlog
      .populate('user', 'username name id')
      .execPopulate();

    user.blogs = user.blogs.concat(blog.id);
    await user.save();
    response.status(201).json(savedBlog.toJSON());
  } catch (e) {
    next(e);
  }
});

blogRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params;
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const blog = await Blog.findById(id);
    const sameUser = blog.user[0].toString() === decodedToken.id;
    if (sameUser) {
      await Blog.findByIdAndRemove(id);
      response.status(204).end();
    } else {
      response.status(401).json({
        error: 'user can remove only its own blog posts'
      });
    }
  } catch (e) {
    next(e);
  }
});

blogRouter.patch('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const { ...dataToUpdate } = request.body;
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    if (dataToUpdate) {
      const result = await Blog.findByIdAndUpdate(id, dataToUpdate, {
        new: true
      });
      response.status(204).json(result.toJSON());
    } else {
      response.status(400).end();
    }
  } catch (e) {
    next(e);
  }
});

blogRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const { id } = request.params;
    const { comment } = request.body;
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    if (comment) {
      const result = await Blog.findByIdAndUpdate(
        id,
        { $push: { comments: comment } },
        {
          new: true
        }
      );
      response.status(204).json(result.toJSON());
    } else {
      response.status(400).end();
    }
  } catch (e) {
    next(e);
  }
});

module.exports = blogRouter;
