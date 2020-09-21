const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body

    const comments = commentsByPostId[req.params.id] || []
    comments.push({ id: commentId, content, status: 'pending' })
    commentsByPostId[req.params.id] = comments

    //It is emitting the event to the event bus when any comment is created
    await axios.post('http://127.0.0.1:4005/events',
        {
            type: 'CommentCreated',
            data: {
                id: commentId,
                content,
                postId: req.params.id,
                status: 'pending'
            }
        })

    res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
    //It is listening for the events from the event bus

    const { type, data } = req.body
    if (type === 'CommentModerated') {
        const { postId, id, status } = data
        const comments = commentsByPostId[postId]
        const comment = comments.find(comment => comment.id === id)
        comment.status = status

        try {
            await axios.post('http://127.0.0.1:4005/events',
                {
                    type: 'CommentUpdated',
                    data: {
                        ...data,
                    }
                })
        } catch (e) {
            console.log('Error occured while firing CommentUpdated event', e)
        }
    }

    console.log('Event recieved', req.body.type)
    res.status(201).send(data)
})

app.listen(4001, () => {
    console.log('Comment service is listing on Port 4001')
})