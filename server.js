const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const Event = require('./models/event')
const routeEvent = require('./routes/event')
const routeResponse = require('./routes/response')
const db = require("./utils/get_db")

const app = express()
 
// Создаем парсер для данных application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({extended: true});

app.use(express.static(__dirname + "/static"))
app.use(cors())
app.use(urlencodedParser)
app.use(bodyParser.json())
app.use(routeEvent)
app.use(routeResponse)

app.get('/', (req, res) => {
    res.send('Empty responce')
})

app.listen(3000, err => {
    if (err) throw err
    console.log("Server started at localhost:3000")
})
