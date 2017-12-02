const nedb = require('nedb-promise')

const db = new nedb({ filename: './data/db.json', autoload: true })

module.exports = db