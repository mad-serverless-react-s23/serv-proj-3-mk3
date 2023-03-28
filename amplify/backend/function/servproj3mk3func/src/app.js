const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const axios = require('axios')
const { response } = require('express')
// so far dummy data works without calling axios...

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.get('/coins', function(req, res) {
  let apiUrl = `https://api.coinlore.com/api/tickers?start=0&limit=10`;
  // copy/paste from textbook...
  if (req.apiGateway && req.apiGateway.event.queryStringParameters) {
    const { start = 0, limit = 10 } = req.apiGateway.event.queryStringParameters;
    apiUrl = `https://api.coinlore.com/api/tickers/?start=${start}&limit=${limit}`;
  };
  // manual copy from book
  axios.get(apiUrl).then(response => {
    res.json({ coins: response.data.data })
  }).catch(err => res.json({ error: err }));
});

app.get('/born', function(req, res) {
  const born = [
    { name: 'AuspiciousFerret', day: 'Tuesday' }
  ]
  res.json({born});
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
