const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    'author': 'Asuna',
    'title': 'Life in SAO',
    'url': 'www.SAO.com',
    'likes': 50000
  },
  {
    'author': 'Luffy',
    'title': 'PIRATE KING',
    'url': 'www.whatsawebsite.com',
    'likes': 120000000
  },
]

const nonExistingId = async () => {
  const blog = new Blog(
    {
      url: 'www.u.gove',
      title: 'INVALID',
      likes: 100
    })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}