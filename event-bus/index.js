const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()

app.use(bodyParser.json())

app.post('/events', (req, res) => {
    //It is listening for the events from the microservices
    const event = req.body

    //It is triggering the events to the microservices
    axios.post('http://localhost:4000/events', event)
    axios.post('http://localhost:4001/events', event)
    axios.post('http://localhost:4002/events', event)

    res.send({ status: 'ok' })
})

app.listen(4005, () => {
    console.log('Event Bus is listing on Port 4005')
})
