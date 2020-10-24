const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcryptjs')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())

  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
  test('id correct format' , async () => {
    const response = await api.get('/api/blogs', )

    const content = response.body.map(r => r.id)
    expect(content[0]).toBeDefined()
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the second document', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain('PIRATE KING')
  })
})

describe('addition of a new blog & generated token' , () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('12345', 10)
    const user = new User({ username: 'ROOT', passwordHash })

    await user.save()
  })

  test('valid format blog post added' , async () => {
    const newBlog = {
      author: 'Alice',
      title: 'AI',
      url: 'UNDERSWORLD.NET',
      likes: 50000
    }
    const res = await api.post('/api/login').send(helper.initialUsers[0])

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${res.body.token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const authors = blogsAtEnd.map(r => r.author)
    expect(authors).toContain(
      'Alice'
    )
  })
  test('fails with status code 400 if data invalid', async () => {
    const newBlog = {
      url: 'www.u.gove',
      title: 'INVALID',
      likes: 100
    }

    const res = await api.post('/api/login').send(helper.initialUsers[0])

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${res.body.token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })

  test('missing title and url should result in status 400' , async () => {
    const newBlog = {
      author: 'Shannon',
      likes:1
    }

    const res = await api.post('/api/login').send(helper.initialUsers[0])

    const result = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${res.body.token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('title')
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  test('if missing, likes reset to 0' , async () => {
    const newBlog = {
      author: 'Shannon',
      url: 'www.goneaway.gove',
      title: 'MURDER'
    }

    const res = await api.post('/api/login').send(helper.initialUsers[0])

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${res.body.token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const likes = response.body.map(r => r.likes)
    expect(likes).toContain(0)
  })
  test('missing token should result in status 401' , async () => {
    const newBlog = {
      author: 'Shannon',
      likes:1
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Unauthorized')
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  test.only('successful deletion' , async () => {
    const toDelete = await Blog.findOne({ author: 'Luffy' })

    const res = await api.post('/api/login').send(helper.initialUsers[0])

    await api
      .delete(`/api/blogs/${toDelete._id}`)
      .set('Authorization', `bearer ${res.body.token}`)
      .expect(204)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length - 1)
  })
  test('invalid token for deletion' , async () => {
    const toDelete = await Blog.findOne({ author: 'Luffy' })

    const res = await api.post('/api/login').send(helper.initialUsers[0])

    await api
      .delete(`/api/blogs${toDelete._id}`)
      .set('Authorization', 'bearer 111111111')
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})



afterAll(() => {
  mongoose.connection.close()
})