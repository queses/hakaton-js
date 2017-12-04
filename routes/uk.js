'use strict'

const express = require('express')
// const axios = require('axios')

const db = require('../utils/get_db')
// const bot = require('../utils/bot')

const router = express.Router()

router.get('/uk', async (req, res) => {
    const result = await db.find({ _cat: 'uk' })
    res.json(result)
})

module.exports = router