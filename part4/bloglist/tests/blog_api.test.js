const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper=require('../utils/list_helper')
const jwt = require('jsonwebtoken');

let initialBlogs=helper.initialBlogs;
let token;

beforeEach(async () => {
  await User.deleteMany({});
  const user = new User({
		username: 'root',
		name: 'root',
		passwordHash: await bcrypt.hash('sekret', 10)
	})

	await user.save()
	const userInDb = await User.findOne({ username: 'root' })
  
	token = jwt.sign({ username: userInDb.username, id: userInDb.id }, process.env.SECRET)
  
  await Blog.deleteMany({});
  initialBlogs.forEach(element => {
    element.user=userInDb.id;
  });
  const blogObjects = initialBlogs
    .map(blog =>new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
})


describe('test if api works correctly', () => {
  test('correct amount of blogs are returned as json', async () => {
      const response = await api.get('/api/blogs').set('Authorization',`Bearer ${token}`)
      expect(response.body).toHaveLength(2)
  })

  test('there is a property named id', async () => {
    const response = await api.get('/api/blogs').set('Authorization',`Bearer ${token}`)
    expect(response.body[0].id).toBeDefined()
  });
})

describe('addition of a new blog', () => {
  test('successfully creates a new blog post', async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    }

    await api
      .post('/api/blogs')
      .set('Authorization',`Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs').set('Authorization',`Bearer ${token}`)
    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain(
      'Canonical string reduction'
    )
  })

  test('if likes property missing default is 0', async () => {
    const newBlog = {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll"
    }

    await api
      .post('/api/blogs')
      .set('Authorization',`Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const response = await api.get('/api/blogs').set('Authorization',`Bearer ${token}`)
    expect(response.body.filter(r=>r.author==="Robert C. Martin")[0].likes).toBe(0);
  })

  test('if title or url properties missing responds with status code 400', async () => {
    const newBlog = {
      //title:"TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization',`Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs').set('Authorization',`Bearer ${token}`)

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('if token missing,adding blog fails with status code 401 unauthorized', async () => {
    const newBlog = {
      title:"TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const response = await api.get('/api/blogs').set('Authorization',`Bearer ${token}`)

    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsBefore = await api.get('/api/blogs').set('Authorization',`Bearer ${token}`)
    const blogToDelete = blogsBefore.body[0]
    
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization',`Bearer ${token}`)
      .expect(204)

    const blogsAfter = await api.get('/api/blogs').set('Authorization',`Bearer ${token}`)

    expect(blogsAfter.body).toHaveLength(blogsBefore.body.length - 1)

    const titles = blogsAfter.body.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('update of a blog', () => {
  test('updates likes correctly with status code 200', async () => {
    const blogsInDb=await api.get('/api/blogs').set('Authorization',`Bearer ${token}`)
    const newBlog={
      "likes":999
    }

    await api
      .put(`/api/blogs/${blogsInDb.body[0].id}`)
      .set('Authorization',`Bearer ${token}`)
      .send(newBlog)
      .expect(200)

    const response = await api.get('/api/blogs').set('Authorization',`Bearer ${token}`)

    const updated = response.body.filter(r => r.id===blogsInDb.body[0].id)

    expect(updated[0].likes).toBe(999)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if add user operation is invalid', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: '',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('invalid username or password')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})