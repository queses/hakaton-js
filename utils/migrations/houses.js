const db = require('../get_db')
const House = require('../../models/house')

const start = async () => {
    ukProm = new Promise((resolve, reject) => {
        db.findOne({ _cat: 'uk', title: "Муниципальное предприятие \"Жилищно-коммунальное управление\"" }, (err, docs) => {
            resolve(docs)
        })
    })
    
    const uk = await ukProm.then()
    console.log(uk)
    const houses = [ new House('Мира', '22', uk._id), new House('Ленина', '4', uk._id) ]
    houses.map((house) => {
        db.insert({ _cat: 'house', ...house }, () => {
        })
    })
}

start()
