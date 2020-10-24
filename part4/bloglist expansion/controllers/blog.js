const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
// const logger = require('../utils/logger')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username:1,user:1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  // logger.info(`POST ${request.body}`)
  const info = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  //console.log('decode' ,decodedToken)
  if (!request.token || !decodedToken.id){
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    author: info.author,
    title: info.title,
    url: info.url,
    likes:info.likes === undefined ? 0 : info.likes,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog.toJSON())
})

blogRouter.put('/:id' , async (request, response) => {
  const body = request.body
  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: body.likes })
  response.json(updatedBlog.toJSON())
})

blogRouter.delete('/:id', async (request,response) => {
  const blog = await Blog.findById(request.params.id)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  } else if (blog.user.toString() !== decodedToken.toString()) {
    return response.status(401).json({
      error: 'user is not creator of blog'
    })
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
module.exports = blogRouter