const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.delete('/:id', async (request, response) => {

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})


blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if(!body.title || !body.url) return response.status(400).json({ error: 'title or url is missing' })

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
    
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
