const express = require("express");
const app = express();
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
const cors = require('cors');
require('dotenv').config()
const USER =  process.env.DB_USER
const PASSWORD = process.env.DB_PASSWORD

// 몽고디비 연걸
mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.cvbef.mongodb.net/?retryWrites=true&w=majority`)
                .then(() => console.log('MongoDb Connected...'))
                .catch(err=> console.log(err))

// 미들웨어
app.use(morgan('tiny'));
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

//  라우터 
const userSign =  require('./routes/user')
app.use('/api' , userSign)


module.exports = app;


