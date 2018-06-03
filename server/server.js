// server.js
const express        = require('express');
const mysql          = require('mysql');
const bodyParser     = require('body-parser');
const app            = express();
const db             = require('./config/db');

const port = 8080;

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.connect(function(err) {
  if (err) return console.log(err);
  console.log("Connected!");
  require('./app/routes')(app, db);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})