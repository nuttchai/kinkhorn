const express = require('express');
const app = express();
const session = require('express-session');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
app.use(bodyParser.json());
const mongoose = require('mongoose');
const People = require('./models/people');

// mongodb
mongoose.connect('mongodb://kinkhorn:TcdVQ7XhxnS3Mp32uGSU@172.31.25.123:27017/ciekinkhorn', 
                { useNewUrlParser: true, useUnifiedTopology: true });

// connect to mongodb
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR'));
db.once('open', function () { 
  console.log('connected sucessfully!!');
})

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

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

const port = process.env.PORT || 8080;
app.listen(port , () => console.log('App listening on port ' + port));

var passport = require('passport');
var userProfile;
 
app.use(passport.initialize());
app.use(passport.session());
 
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
 
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


/* JWT */
  const accessTokenSecret = '9y$B&E)H@McQfTjWnZq4t7w!z%C*F-Ja';

  const authenticateJWT = (req, res, next) => {
    var cookie = req.cookies;

    if (cookie['token']) {
      
      jwt.verify(cookie['token'], accessTokenSecret, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
        res.sendStatus(401);
    }
};


/*  Google AUTH  */
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '867773542903-0hlkemtvhg4s5fuceopsh111kd729ulj.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'bbFoC3kM7XkJzf94EvYTNYcv';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/oauth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/oauth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/oauth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });


/* APIs */
app.get('/success', (req, res) => {
  const accessToken = jwt.sign({ user: userProfile._json }, accessTokenSecret);
  console.log(accessToken)
  var date = new Date();
  date.setDate(date.getDate() + 2);

  res.cookie('token', accessToken, {
    expires: date,
    secure: false, // set to true if your using https
    httpOnly: true,
  });

  const person = new People({
    name: userProfile._json.name,
    given_name: userProfile._json.given_name,
    family_name: userProfile._json.family_name,
    picture: userProfile._json.picture,
    email: userProfile._json.email,
    email_verified: userProfile._json.email_verified,
    hd: userProfile._json.hd
  })
  console.log(person.name)
  db.collection("people").find({}, {name: person.name}).toArray(function(err, result){
    if (err) throw err;
    if (result.length === 0) {
      person.save()
      .then(saveUser => {
        res.writeHead(302, {
          Location: 'http://localhost:3000/'
          });
          res.end();
      })
    } else {
      res.writeHead(302, {
        Location: 'http://localhost:3000/'
        });
        res.end();
    }
  })
  // console.log("Hello Success")
});

app.get('/oauth/user/info', authenticateJWT, (req, res) => {
  var cookie = req.cookies
  var decoded = jwt.decode(cookie['token'])
  var money = 0
  db.collection("people").find({}, {name: decoded.name}).toArray(function(err, result){
    if (err) throw err;
    console.log(result[0])
    money = result[0].money
    user = result[0]._id
    decoded["money"] = money
    decoded["user_id"] = user
    return res.json(decoded)
  })
});

app.get('/oauth/logout', (req, res) => {
  res.clearCookie("token");
  res.redirect('/');
});

app.get('/error', (req, res) => res.send("error logging in"));

app.put('/oauth/topup/:money', authenticateJWT, (req, res) => {
  try{
    var cookie = req.cookies;
    var decoded = jwt.decode(cookie['token']);
    var money_change = parseInt(req.params.money)
    db.collection("people").find({}, {name: decoded.name}).toArray(function(err, result){
      if (err) throw err;
      var currMoney = result[0].money + money_change
      db.collection("people").updateOne({name: decoded.user.name}, {$set: {money: currMoney} }, function(err, res){
        if (err) throw err;
        console.log("1 record updated")
      })
    })
  } catch(e){
      res.status(404).send("Error!")
  }
  res.sendStatus(200)
})

app.put('/oauth/pay/:price', authenticateJWT, (req, res) => {
  try{
    var cookie = req.cookies;
    var decoded = jwt.decode(cookie['token']);
    var money_change = parseInt(req.params.price)
    db.collection("people").find({}, {name: decoded.name}).toArray(function(err, result){
      if (err) throw err;
      if (result[0].money < money_change) {
        res.status(404).send("Not enough money")
        return
      }
      var currMoney = result[0].money - money_change
      db.collection("people").updateOne({name: decoded.user.name}, {$set: {money: currMoney} }, function(err, res){
        if (err) throw err;
        console.log("1 record updated")
      })
      res.status(200).send("Paid!")
    })
  } catch(e){
      res.status(404).send("Error!")
  }
})