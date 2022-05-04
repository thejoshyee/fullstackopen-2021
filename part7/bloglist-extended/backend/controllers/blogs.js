const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs)

})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

    try {
        const blog = await Blog.findById(request.params.id)
        const user = request.user 

        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
      
        if (blog.user.toString() === user.id.toString()) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } else {
            return response.status(401).json({ error: 'you do not have permission to delete this blog' })
        }
        
    } catch (error) {
        if (error.name === 'JsonWebTokenError')
            response.status(401).json({ error: 'token missing or invalid' })
    } 

})

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//         return authorization.substring(7)
//     }
//     return null
// }


blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    try {

        // const token = getTokenFrom(request)

        const body = request.body
        const user = request.user

        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        if(!body.title || !body.url) return response.status(400).json({ error: 'title or url is missing' })

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes | 0,
            user: user._id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.json(savedBlog)

    } catch (error) {
        if (error.name === 'JsonWebTokenError')
            response.status(401).json({ error: 'token missing or invalid' })
    } 
    
})


blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)

})


module.exports = blogsRouter 
