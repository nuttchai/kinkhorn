const express = require('express');
const app = express();
const session = require('express-session');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

// app.get('/', function(req, res) {
//   res.send("Hello World!");
// });

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
      console.log(cookie['token'])
      
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
const GOOGLE_CLIENT_SECRET = 'wBZPbezw1jYGvciT4hLnjqvg';

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
  const accessToken = jwt.sign({ user: userProfile["_json"] }, accessTokenSecret);
  var date = new Date();
  date.setDate(date.getDate() + 2);
  res.cookie('token', accessToken, {
    expires: date,
    secure: false, // set to true if your using https
    httpOnly: true,
  });
  // res.redirect('/');
  res.writeHead(302, {
    Location: 'http://localhost:3000/'
    });
    res.end();
});

app.get('/oauth/user/info', authenticateJWT, (req, res) => {
  var cookie = req.cookies;
  var decoded = jwt.decode(cookie['token']);
  return res.json(decoded)
});

app.get('/error', (req, res) => res.send("error logging in"));