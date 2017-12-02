const express = require('express')
const axios = require('axios')

const db = require('../utils/get_db')

const router = new express.Router()

router.post('/event', async (req, res) => {
    if ((!req.body) || (!req.body.event)) {
        res.sendStatus(400);
        return
    }
    db.insert({ _cat: 'event', ...req.body.event }, async (err, event) => {
        res.json({ ok: true });
        const users = await getAllUsers(event)
        console.log("USER", users)
        users.map((user) => {
            let mes = `Ваша УК извещает: ${event.title}. ${event.descr}`
            // СМС
            const responce = axios.get('https://smsc.ru/sys/send.php', { params: {
                login: 'queses',
                psw: 'f22bfae8d84fbe764c9fbe1d7a450445',
                phones: user.phone,
                mes,
                charset: 'utf-8'
            }}).catch(err => {
                console.log(err)
            }).then(resp => {
                // console.log(resp)
            })
            // Телеграм
            const bot = require('../utils/bot')
            const chatId = require('../utils/bot/chatId')
            if(user.phone){
                bot.telegram.sendMessage(chatId, mes)
                res.sendStatus('200')
            }
            
        })
    })
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