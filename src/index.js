require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')
const dirname = path.dirname()

const cors = require('cors')

const app = express()

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true
    }
)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(
    '/files',
    express.static(path.resolve(dirname, '..', 'tmp', 'uploads'))
)

app.use(require('./routes'))
app.listen(3000, ()=>{
    console.log('Server runnign at port 3000')
})