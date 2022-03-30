const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blogsRouter = require('../controllers/blogs')
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

afterAll(() => {
    mongoose.connection.close()
})