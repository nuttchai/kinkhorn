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
mongoose.connect(process.env.MONGO_URL,
                { 
                  dbName: process.env.MONGO_DB,
                  retryWrites: false,
                  useFindAndModify: false,
                  useNewUrlParser: true,
                  useUnifiedTopology: true,
                  //replicaSet: 'rs0',
                  readPreference: 'secondaryPreferred',
                  auth: {
                    user: process.env.MONGO_USER,
                    password: process.env.MONGO_PASS
                  },
                  tls: true,
                  tlsCAFile: './src/cert/rds-combined-ca-bundle.pem',
                  //tlsAllowInvalidHostNames: true
                });

// oomhaikumrangjainutt<3

// redis
const redisClient = require("redis").createClient;
const redis = redisClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASS
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

app.get('/', async (req, res, next) => {
  res.send("Hello World!");
})

module.exports.app = app;
module.exports.redis = redis;
module.exports.getAsync = getAsync;

