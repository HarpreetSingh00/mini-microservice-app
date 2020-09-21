const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()

app.use(bodyParser.json())

app.post('/events', async (req, res) => {
    const { type, data } = req.body
    if (type === 'CommentCreated') {
        const { content } = data
        const pattern = /orange/i
        const status = pattern.test(content) ? 'rejected' : 'approved'

        console.log('status:::', status)
        try {
            await axios.post('http://127.0.0.1:4005/events', {
                type: 'CommentModerated',
                data: {
                    ...data,
                    status: status
                }
            }) //Emitted the event to event bus
        } catch (e) {
            console.log('Error occured while firing CommentModerated event', e)
        }
    }
    res.send({})
})

app.listen(4003, () => {
    console.log('Moderation Service is listing on Port 4003')
})