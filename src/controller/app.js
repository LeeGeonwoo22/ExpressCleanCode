const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
const cors = require('cors');


// 미들웨어
app.use(morgan('tiny'));
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

//  라우터 
const userSign =  require('./routes/routers')
app.use('/api' , userSign)

//

// console.log("env :",process.env)


module.exports = app;
