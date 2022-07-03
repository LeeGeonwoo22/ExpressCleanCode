const express = require('express');
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
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


// app.get('/error', (req, res) => {
//     logger.error('Error message');
//   res.sendstatus(400);
// })

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

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})




