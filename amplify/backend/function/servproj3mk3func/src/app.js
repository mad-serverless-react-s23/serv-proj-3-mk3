const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const axios = require('axios')
const { response } = require('express')

const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.get('/coins', function(req, res) {
  let apiUrl = `https://api.coinlore.com/api/tickers?start=0&limit=10`;
  
  if (req.apiGateway && req.apiGateway.event.queryStringParameters) {
    const { start = 0, limit = 10 } = req.apiGateway.event.queryStringParameters;
    apiUrl = `https://api.coinlore.com/api/tickers/?start=${start}&limit=${limit}`;
  };
  
  axios.get(apiUrl).then(response => {
    res.json({ coins: response.data.data })
  }).catch(err => res.json({ error: err }));
});

app.get('/born', function(req, res) {
  let bornUrl = `https://api.github.com/users/mysticalskeptic`;

  axios.get(bornUrl).then(response => {
    res.json({ born: response.data })
    // console.log(response);
  }).catch(err => res.json({ error: err }))
});

module.exports = app
