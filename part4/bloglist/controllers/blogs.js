const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


blogsRouter.get('/', async (request, response) => {
    const blogs=await Blog.find({}).populate('user',{username:1,name:1})
      response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  let body=request.body;
  
  if (!body.title || !body.url || !body.author) {
    return response.status(400).json({
      error: 'title, author and url are required'
    });
  }

  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  const result =await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id',async (request,response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);
  if(user._id.toString()===blog.user.toString()){
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }
});

blogsRouter.put('/:id',async (request,response) => {
  let body=request.body;
  const updatedBlog=await Blog.findByIdAndUpdate(request.params.id, body, { new: true,upsert:true,setDefaultsOnInsert:true})
  response.json(updatedBlog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const comment = request.body.comment;

  try {
    const blog = await Blog.findById(request.params.id);
    if(blog) {
      if(Array.isArray(blog.comments)) {
        blog.comments.push(comment);
      } else {
        blog.comments = [comment];
      }
      const result = await blog.save();
      response.status(200).json(result);
    } else {
      response.status(400).json({
        error: 'No blog found'
      });
    }
  } catch(err) {
    response.status(400).json({
      error: err.message
    })
  }
})

module.exports = blogsRouter