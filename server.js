const http = require('http')
const path = require('path')
const express =require('express')

const app = express()

app.use(express.static(path.join(__dirname,'public')))

const port = process.env.PORT || 8080
http.createServer(app).listen(port, () => {
    console.log('http server started at port '+port)
})