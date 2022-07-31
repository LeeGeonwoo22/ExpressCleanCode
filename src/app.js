// 개발 환경설정
const express = require('express');
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
const {logger}  = require('./config/winston')
// 환경변수
require('dotenv').config()
const PORT =  process.env.DB_PORT
const USER =  process.env.DB_USER
const PASSWORD = process.env.DB_PASSWORD

// 몽고디비 연걸
mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.cvbef.mongodb.net/?retryWrites=true&w=majority`).then(() => console.log('MongoDb Connected...')).catch(err=> console.log(err))

morgan('combined', {
    skip: function (req, res) { return res.statusCode < 400 }
  })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// 라우터
app.use('/api/users' , require('./controller/users'));

// 서버 실행
app.get('/', (req, res) => {
    // logger.info('GET /');
  res.send('Hello World!')
//   res.sendStatus(200);
})







app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})




