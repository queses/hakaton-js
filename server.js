const express = require('express')
const bodyParser = require('body-parser')
const Event = require('./models/event')
const routeEvent = require('./routes/event') 
const db = require("./utils/get_db")


const app = express()
 
// Создаем парсер для данных application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({extended: true});

app.use(express.static(__dirname + "/static"))
app.use(urlencodedParser)
app.use(bodyParser.json());
app.use(routeEvent)

app.get('/', (req, res) => {
    res.send(':)')
})

app.listen(3000, err => {
    if (err) {
        console.log(err)   
        return
    }
    console.log("Server started at localhost:3000")
})
