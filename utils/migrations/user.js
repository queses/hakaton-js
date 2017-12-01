const db = require('../get_db')
const User = require('../../models/user')

const start = async () => {
    houseProm = new Promise((resolve, reject) => {
        db.findOne({ _cat: 'house' }, (err, docs) => {
            resolve(docs)
        })
    })
    
    const house = await houseProm.then()
    console.log(house)
    const user = new User('Максим', 'Кобозев', '89825365088', house._id)
    db.insert({ _cat: 'user', ...user }, () => {
    })
}

start()
