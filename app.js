const express = require("express");
const cors = require("cors");
const path = require("path");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const authRoutes = require('./routes/auth')
const articlesRoutes = require('./routes/articles');

const app = express();

app.use(cors())
app.use(express.json())
app.use(session({
    secret:"Secret Key",
    resave:false,
    saveUninitialized:false,
}))
app.use(flash())
app.use(cookieParser())

app.use(express.urlencoded({extended:true}))
//! '/' going to public
app.use(express.static(path.resolve(__dirname,"public"))) 
//! '/css' going to public/css
app.use("/css",express.static(path.resolve(__dirname,"public/css"))) 
//! '/js' going to public/js
app.use("/js",express.static(path.resolve(__dirname,"public/js")))
app.use("/fonts",express.static(path.resolve(__dirname,"public/fonts")))
app.use("/images",express.static(path.resolve(__dirname,"public/images")))

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))


app.use('/api/auth', authRoutes)
app.use('/api/articles', articlesRoutes)



module.exports = app