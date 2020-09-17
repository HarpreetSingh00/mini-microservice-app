const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { postTitle } = req.body
    posts[id] = {
        id,
        postTitle
    }

    res.status(201).send(posts[id])
})

app.listen(4000, () => {
    console.log('Post service is listing on Port 4000')
})