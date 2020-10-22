const blogRouter = require('express').Router()
const Blog = require('../models/blog')
// const logger = require('../utils/logger')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  // logger.info(`POST ${request.body}`)

  const info = request.body
  const blog = new Blog({
    author: info.author,
    title: info.title,
    url: info.url,
    likes:info.likes === undefined ? 0 : info.likes,
  })
  const savedBlog = await blog.save()
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
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
module.exports = blogRouter