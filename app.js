const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require('./routes/auth')
const articlesRoutes = require('./routes/articles')

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.resolve(__dirname,"public")))

app.use('/api/auth', authRoutes)
app.use('/api/articles', articlesRoutes)



module.exports = app