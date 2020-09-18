const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { postTitle } = req.body
    posts[id] = {
        id,
        postTitle
    }

    //It is emitting the event to the event bus when any post is created
    await axios.post('http://localhost:4005/events',
        {
            type: 'PostCreated',
            data: {
                id,
                postTitle,
            }
        })

    res.status(201).send(posts[id])
})

app.post('/events', async (req, res) => {
    //It is listening for the events from the event bus
    console.log('Event recieved', req.body.type)
    res.send({})
})

app.listen(4000, () => {
    console.log('Post service is listing on Port 4000')
})