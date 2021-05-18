const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { promisify } = require("util");

const app = express();

// mongodb

// ec2
// mongoose.connect('mongodb://kinkhorn:TcdVQ7XhxnS3Mp32uGSU@172.31.25.123:27017/ciekinkhorn', 
//                 { useNewUrlParser: true, useUnifiedTopology: true });

// document-db
mongoose.connect('mongodb://kinkhorn.cluster-ciluasfmkj9g.ap-southeast-1.docdb.amazonaws.com:27017',
                { 
                  dbName: 'ciekinkhorn',
                  retryWrites: false,
                  useFindAndModify: false,
                  useNewUrlParser: true,
                  useUnifiedTopology: true,
                  //replicaSet: 'rs0',
                  readPreference: 'secondaryPreferred',
                  auth: {
                    user: 'kinkhorn',
                    password: 'TcdVQ7XhxnS3Mp32uGSU'
                  },
                  tls: true,
                  tlsCAFile: './src/cert/rds-combined-ca-bundle.pem',
                  //tlsAllowInvalidHostNames: true
                });

// oomhaikumrangjainutt<3

// redis
const redisClient = require("redis").createClient;
const redis = redisClient({
  host: '172.31.25.123',
  port: 6379,
  password: 'QCY68NMK7KGNabfPg72P'
});

// check redis connection error
redis.on('error', err => {
  console.log('Error ' + err);
});

const getAsync = promisify(redis.get).bind(redis);

// routes
const shopsRoutes = require('./routes/shops');
const ordersRoutes = require('./routes/orders');

// connect to mongodb
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR'));
db.once('open', function () { 
  console.log('connected sucessfully!!');
})

// parse your incoming responses as a JSON object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(express.static(__dirname + '/public'));

// set route
app.use("/api/shops", shopsRoutes);
app.use("/api/orders", ordersRoutes);

module.exports.app = app;
module.exports.redis = redis;
module.exports.getAsync = getAsync;
