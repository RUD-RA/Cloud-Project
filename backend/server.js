const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
const port = process.env.PORT

// all routes
app.use("/api",require(path.join(__dirname,'routes/users.js')))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})