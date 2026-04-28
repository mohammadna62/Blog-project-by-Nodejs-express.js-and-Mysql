const express = require("express");
const cors = require("cors");
const path = require("path");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const authRoutes = require('./routes/auth')
const articlesRoutes = require('./routes/articles');
const tagsRoutes = require('./routes/tags');
const adminRoutes = require('./routes/p-admin');

const app = express();

//* Enables CORS for cross-origin requests (allows frontend to access this API)
app.use(cors())

//* Use for Pars Json
app.use(express.json())
app.use(session({
    secret:"Secret Key",
    resave:false,
    saveUninitialized:false,
}))

//* By this Package , Show Message on Ejs
app.use(flash())

//* This package for Pars Cookie and Cookie Manager
app.use(cookieParser()) 

//* To Get req.body Data
app.use(express.urlencoded({extended:true}))

//! '/' going to public
app.use(express.static(path.resolve(__dirname,"public"))) 
//! '/css' going to public/css
app.use("/css",express.static(path.resolve(__dirname,"public/css"))) 
//! '/js' going to public/js
app.use("/js",express.static(path.resolve(__dirname,"public/js")))
//! '/fonts' going to public/fonts
app.use("/fonts",express.static(path.resolve(__dirname,"public/fonts")))
//! '/images' going to public/images
app.use("/images",express.static(path.resolve(__dirname,"public/images")))

//* Ejs Template Engine configs
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))


app.use('/auth', authRoutes)
app.use('/articles', articlesRoutes)
app.use('/tags', tagsRoutes)
app.use('/p-admins', adminRoutes)



module.exports = app