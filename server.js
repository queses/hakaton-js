const express = require('express')
const bodyParser = require('body-parser');

const app = express()

// создаем парсер для данных application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static(__dirname + "/static"))
app.use(urlencodedParser)

app.post('/event', (req, res) => {
    if(!req.body) return response.sendStatus(400);
    console.log(req.body);
    res.json({ ok: true });
})

app.listen(3000, err => {
    if (err) {
        console.log(err)   
        return
    }
    console.log("Server started at localhost:3000")
})
