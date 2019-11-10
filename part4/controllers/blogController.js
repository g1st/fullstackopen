const blogRouter = require('express').Router();
const Blog = require('../modules/blog');

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs.map(blog => blog.toJSON()));
  } catch (e) {
    next(e);
  }
});

blogRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params;
  try {
    const blog = await Blog.findOne({ _id: id });
    response.json(blog.toJSON());
  } catch (e) {
    next(e);
  }
});

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);
  try {
    const result = await blog.save();
    response.status(201).json(result.toJSON());
  } catch (e) {
    next(e);
  }
});

blogRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params;
  try {
    await Blog.findByIdAndRemove(id);
    response.status(204).end();
  } catch (e) {
    next(e);
  }
});

blogRouter.patch('/:id', async (request, response, next) => {
  const { id } = request.params;
  const { ...dataToUpdate } = request.query;

  if (dataToUpdate) {
    try {
      const result = await Blog.findByIdAndUpdate(id, dataToUpdate, {
        new: true
      });
      response.status(204).json(result.toJSON());
    } catch (e) {
      next(e);
    }
  } else {
    response.status(400).end();
  }
});

module.exports = blogRouter;
