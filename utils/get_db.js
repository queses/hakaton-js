const nedb = require('nedb')

const db = new nedb({ filename: './data/db.json', autoload: true })

module.exports = db