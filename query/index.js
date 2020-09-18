const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

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

app.get('/posts', (req, res) => {
    //It will return all the posts with the relevant comments
    res.send(posts)
})

app.post('/events', (req, res) => {
    //It will listen for the events from the event bus
    const { type, data } = req.body

    if (type === 'PostCreated') {
        const { id, postTitle } = data
        posts[id] = { id, postTitle, comments: [] }
    }

    if (type === 'CommentCreated') {
        const { id, content, postId } = data
        posts[postId]['comments'].push({ id, content })
    }

    res.send({})
})

app.listen(4002, () => {
    console.log('Query service is listing on Port 4002')
})