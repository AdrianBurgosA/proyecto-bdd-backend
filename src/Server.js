const express = require("express")
var app = express()
const cors = require('cors')
const uris = require('../api/uris')
const bodyParser = require('body-parser')
const port = 3000

app.use(cors())
app.use("/api",uris)
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
})*

app.listen(port, () => {
    console.log(`El servidor esta inicializado en el puerto ${port}`)
})
