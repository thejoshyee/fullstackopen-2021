const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

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
            .expect(201)
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
            .expect(201)
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



afterAll(() => {
    mongoose.connection.close()
})