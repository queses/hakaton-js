'use strict'

const db = require('../get_db')
const User = require('../../models/user')

const start = async () => {
    // const houseProm = new Promise((resolve, reject) => {
    //     db.findOne({ _cat: 'house' }, (err, docs) => {
    //         resolve(docs)
    //     })
    // })
    
    const house = await db.findOne({ _cat: 'house' })
    console.log(house)
    let user = new User('Максим', 'Кобозев', '89825365088', house._id)
    user.chatId = "337283924"
    db.insert({ _cat: 'user', ...user }, (err, dosc) => {
    })
}

start()
