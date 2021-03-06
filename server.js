require('dotenv').load();

var Bean = require('ble-bean');
var beanStream = require('ble-bean-stream');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();


var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb-bluebird');

var db;
var fertility_data, test_db;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongo.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@ds139072.mlab.com:39072/fertility_data').then(function(database){

 db = database;
 // Collections
 test_db = db.collection('beantest'); //TODO: change this to real database after test
  // Start Server
  app.listen(3000, function() {
    console.log('Server: Running on port 3000');
  });

}, function(err) {
  console.log(err);
});

app.post('/collect_data', function (req, res, next) {
  console.log('req: ', req.body);
  let request = req.body,
      timeStamp = request.timeStamp,
      uuid = request.uuid,
      temp = request.temp;


  // to do: handle new sensortag
  test_db.update({ 'uuid': uuid }, {'$push': {'data': {'timeStamp': timeStamp, 'temp': temp}}})

  res.send('Got a POST request');
})

app.get('/test_server', function (req, res) {
  console.log('req: ', req.body);

  console.log('message!!');
  res.send('Successful request!!');
})
