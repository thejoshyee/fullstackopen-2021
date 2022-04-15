const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.intialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

  
// getting entries
describe('getting blog entries', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    test('entry id is without _', async () => {
        const response = await api.get('/api/blogs')
        const blogObjects = helper.intialBlogs
        for (let i = 0; i < blogObjects.length; i++) {
            expect(response.body[i].id).toBeDefined()
        }
    })

})

//adding entries
describe('adding entries', () => {
    test('add new blog entries', async () => {
        const newBlog = {
            title: 'Coding is fun!',
            author: 'Josh Yee',
            url: 'joshyee.com',
            likes: 7
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const titles = response.body.map(blog => blog.title)
        const blogObjects = helper.intialBlogs

        expect(response.body).toHaveLength(blogObjects.length + 1)
        expect(titles).toContain(newBlog.title)
    })

    test('if likes not defined, default to 0', async () => {
        const newBlog = {
            title: 'Blogging is fun',
            author: 'Josh Yee',
            url: 'joshyee.com',
        }

        const response = await api 
            .post('/api/blogs') 
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBeDefined()
        expect(response.body.likes).toBe(0)
    }) 

    test('if new blog doesnt have title and url send 400 bad request', async () => {
        const newBlog = {
            content: 'Blogging is the best',
            likes: 0
        }

        await api 
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.intialBlogs.length)

    })

})

describe('Deleting & Updating Functionality', () => {
    const blogObjects = helper.intialBlogs

    test('delete blog entries', async () => {
        await api
            .delete(`/api/blogs/${blogObjects[0]._id}`)
            .expect(204)

        const response = await api.get('/api/blogs')
        const titles = response.body.map(r => r.title)

        expect(response.body).toHaveLength(blogObjects.length - 1)
        expect(titles).not.toContain(blogObjects[0].title)
    })

    test('update entries', async () => {

        const update = {
            title: 'How to be Awesome',
            author: 'Josh Yee',
            likes: 7,
            url: 'www.joshyee.com'
        }

        const putResponse = await api
            .put(`/api/blogs/${helper.intialBlogs[1]._id}`)
            .send(update)
            .expect(200)

        expect(putResponse.body.title).toBe(update.title)
        expect(putResponse.body.author).toBe(update.author)
        expect(putResponse.body.likes).toBe(update.likes)
        expect(putResponse.body.url).toBe(update.url)

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
            .expect(201)
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
    
        expect(result.body.error).toContain('username must be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
})


afterAll(() => {
    mongoose.connection.close()
})