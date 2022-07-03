const express = require('express');
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const {logger}  = require('./config/winston')
require('dotenv').config()

const Port =  process.env.DB_PORT
const User =  process.env.DB_USER
const Password = process.env.DB_PASSWORD


mongoose.connect(`mongodb+srv://${User}:${Password}@cluster0.cvbef.mongodb.net/?retryWrites=true&w=majority`).then(() => console.log('MongoDb Connected...')).catch(err=> console.log(err))



morgan('combined', {
    skip: function (req, res) { return res.statusCode < 400 }
  })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    logger.info('GET /');
  res.send('Hello World!')
//   res.sendStatus(200);
})


app.get('/error', (req, res) => {
    logger.error('Error message');
  res.sendstatus(400);
})

app.listen(Port, () => {
  console.log(`Example app listening on port ${Port}`)
})




