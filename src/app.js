const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const morgan = require('morgan')
const Port = 3000

const {logger}  = require('./config/winston')
// EXAMPLE: only log error responses

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