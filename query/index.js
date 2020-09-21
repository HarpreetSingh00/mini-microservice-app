const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const posts = {}
/*******
 * Posts Object Example
    posts === {
        'abdsd': {
            id: 'abdsd',
            title: 'Post title',
            comments: [
                { id: 'c123', content: 'Comment 1' },
                { id: 'c345', content: 'Comment 2' },
            ]
        },
        ....{}
    }
******/

const handleEvents = (type, data) => {
    if (type === 'PostCreated') {
        const { id, postTitle } = data
        posts[id] = { id, postTitle, comments: [] }
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data
        posts[postId]['comments'].push({ id, content, status })
    }

    if (type === 'CommentUpdated') {
        const { id, postId, status } = data
        const comments = posts[postId]['comments']

        const comment = comments.find(comment => comment.id === id)
        comment.status = status
    }
}

app.get('/posts', (req, res) => {
    //It will return all the posts with the relevant comments
    res.send(posts)
})

app.post('/events', (req, res) => {
    //It will listen for the events from the event bus
    const { type, data } = req.body

    handleEvents(type, data)

    res.send({})
})

app.listen(4002, async () => {
    console.log('Query service is listing on Port 4002')
    const res = await axios.get('http://127.0.0.1:4005/events')
    for (let event of res.data) {
        console.log('Processing the events', event.type)
        handleEvents(event.type, event.data)
    }
})