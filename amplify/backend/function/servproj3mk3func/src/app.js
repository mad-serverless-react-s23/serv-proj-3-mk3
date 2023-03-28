const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

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
  const coins = [
    { name: 'Grobnok Bloodsplinters', symbol: 'GBSP', price_usd: "1010192.22" },
    { name: 'Imperial Standard Gu', symbol: 'ISGU', price_usd: "0.00102" },
    { name: 'Yernz', symbol: 'YRNZ', price_usd: "2" }
  ]
  res.json({coins});
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
