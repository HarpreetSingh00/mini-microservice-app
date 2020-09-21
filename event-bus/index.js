const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()

app.use(bodyParser.json())

const events = []

app.post('/events', (req, res) => {
    //It is listening for the events from the microservices
    const event = req.body

    events.push(event)

    //It is triggering the events to the microservices
    try {
        axios.post('http://127.0.0.1:4000/events', event) //Post Service
    } catch (e) {
        console.log('Error occured while sending the event to Post Service')
    }

    try {
        axios.post('http://127.0.0.1:4001/events', event) //Comment Service
    } catch (e) {
        console.log('Error occured while sending the event to Comment Service')
    }

    try {
        axios.post('http://127.0.0.1:4002/events', event) //Query Service
    } catch (e) {
        console.log('Error occured while sending the event to Query Service')
    }

    try {
        axios.post('http://127.0.0.1:4003/events', event) //Moderate Service
    } catch (e) {
        console.log('Error occured while sending the event to Moderate Service')
    }

    res.send({ status: 'ok' })
})

app.get('/events', (req, res) => {
    res.send(events)
})

app.listen(4005, () => {
    console.log('Event Bus is listing on Port 4005')
})
