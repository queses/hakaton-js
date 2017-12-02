'use strict'

const express = require('express')
// const axios = require('axios')

const db = require('../utils/get_db')
// const bot = require('../utils/bot')

const router = express.Router()

router.get('/response', async (req, res) => {
    console.log('ok')
    let docs = await db.find({ _cat: 'response' })
    // const fullDocs = docs.map(async (response) => 
    const fullDocs = []
    for (let response of docs) {
        const user = await db.findOne({ _cat: 'user', _id: response.userId })
        if (user) {
            response.user = user
            const house = await db.findOne({ _cat: 'house', _id: user.houseId })
            if (house) response.house = house
        }
        fullDocs.push(response)
    }
    setTimeout(() => {
        console.log(fullDocs)
        res.json(fullDocs)
    }, 1000)
})

router.delete('/response', async (req, res) => {
    db.remove({ _cat: 'response '})
    res.send('ok')
})

module.exports = router
