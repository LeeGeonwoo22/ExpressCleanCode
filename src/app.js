const express = require('express');
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
const {logger}  = require('./config/winston')
require('dotenv').config()

const PORT =  process.env.DB_PORT
const USER =  process.env.DB_USER
const PASSWORD = process.env.DB_PASSWORD
const { User } = require('./entities/models/User')

mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.cvbef.mongodb.net/?retryWrites=true&w=majority`).then(() => console.log('MongoDb Connected...')).catch(err=> console.log(err))

morgan('combined', {
    skip: function (req, res) { return res.statusCode < 400 }
  })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    // logger.info('GET /');
  res.send('Hello World!')
//   res.sendStatus(200);
})

// 회원가입
app.post('/signup', (req,res)=>{
  const user = new User(req.body)
  user.save((err, doc) =>{
    if(err) return res.json(
      {
        success : false , err
      }
    )
      return res.status(200).json({
        success : true
      })
  })
})

// 로그인
app.post('/login', (req,res)=>{
  User.findOne({email : req.body.email} , (err, user) =>{
    if(!user) {
      return res.json({
        loginSucess : false,
        message : "이메일에 해당하는 유저가 없습니다."
      })
    }
    // 해당 유저가 있음
    user.comparePassword(req.body.password, (err, isMatch) =>{
      if(!isMatch) return res.json({ loginSucess : false, message : "비밀번호가 틀렸습니다."})

      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        // 토큰 저장 . 쿠키 ? 로컬 스토리지?
        res.cookie("fortuneCookie", user.token)
        .status(200)
        .json({ loginSucess : true, userId : user._id})
      })

    })
  })

})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})




