const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())


app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)



module.exports = app 
