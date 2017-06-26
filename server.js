require('dotenv').load();

var Bean = require('ble-bean');
var beanStream = require('ble-bean-stream');
var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb-bluebird');

var db;
var fertility_data;

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static('web'));

mongo.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@ds139072.mlab.com:39072/fertility_data').then(function(database){

 db = database;
 // Collections
 fertility_data = db.collection('fertility_data');

  // Start Server
  app.listen(3000, function() {
    console.log('Server: Running on port 3000');
  });

}, function(err) {
  console.log(err);
});


