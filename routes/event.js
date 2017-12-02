const express = require('express')
const axios = require('axios')

const db = require('../utils/get_db')
const bot = require('../utils/bot')

const router = new express.Router()

router.post('/event', async (req, res) => {
    if ((!req.body) || (!req.body.event)) {
        res.sendStatus(400);
        return
    }
    const event = await db.insert({ _cat: 'event', ...req.body.event })
    const users = await db.find({ _cat: 'user' })
    console.log("USER", users)
    let mes = `Ваша УК извещает: ${event.title}. ${event.descr}`
    users.map((user) => {
        if (event.dateTo && event.dateFrom) {
            mes = mes.concat(`. С ${event.dateFrom} по ${event.dateTo}`)
        }
        // СМС
        const smsParams = {
            login: 'queses',
            psw: 'f22bfae8d84fbe764c9fbe1d7a450445',
            phones: user.phone,
            mes,
            charset: 'utf-8'
        }
        const responce = axios.get('https://smsc.ru/sys/send.php', { params: smsParams }).catch(err => {
            console.log(err)
        }).then(resp => {
            // console.log(resp)
        })

        // Телеграм
        console.log(user)
        if (user.chatId) {
            bot.sendMessage(user.chatId, mes).then((p) => {
                console.log(p)
            })
        }
    })
    res.json({ ok: true });
})

router.get('/event', async (req, res) => {
    db.find({ _cat: 'event' }, (err, docs) => {
        console.log(docs)
    })
})

router.get('/event/test', async (req, res) => {
    let event = new Event("oks", "blalblaa")
    // console.log(db)
    db.insert({ _cat: 'event', ...event }, (err, newDoc) => {
        console.log(newDoc)
        res.send('ok')
    })
})

module.exports = router

const getAllUsers = async (event) => {
    prom = new Promise((resolve, reject) => {
        db.find({ _cat: 'user' }, (err, doc) => {
            resolve(doc)
        })
    })
    user = await prom.then()
    return user
}