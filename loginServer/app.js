const express = require("express");
const app = express();
const session = require("express-session");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
app.use(bodyParser.json());
const mongoose = require("mongoose");
const People = require("./models/people");

// mongodb
mongoose.connect(
  "mongodb://kinkhorn-db.cluster-ciluasfmkj9g.ap-southeast-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false",
  {
    dbName: "ciekinkhorn",
    retryWrites: false,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //replicaSet: 'rs0',
    readPreference: "secondaryPreferred",
    auth: {
      user: "kinkhorn",
      password: "TcdVQ7XhxnS3Mp32uGSU",
    },
    tls: true,
    tlsCAFile: "./src/cert/rds-combined-ca-bundle.pem",
    //tlsAllowInvalidHostNames: true
  }
);

// connect to mongodb
var db = mongoose.connection;
db.on("error", console.error.bind(console, "CONNECTION ERROR"));
db.once("open", function () {
  console.log("connected sucessfully!!");
});

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-type,Accept,X-Access-Token,X-Key,authorization"
  );
  res.header("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.set("view engine", "ejs");
// app.use(cookieParser());
// var date = new Date();
// date.setDate(date.getDate() + 2);
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
    cookie: {
      path: "/",
      domain: "kinkhorn.pongpich.xyz",
      expires: new Date(new Date() + 2),
    },
    signed: false,
    secure: true,
    httpOnly: false,
  })
);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("App listening on port " + port));

var passport = require("passport");
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

/* JWT */
const accessTokenSecret = "9y$B&E)H@McQfTjWnZq4t7w!z%C*F-Ja";

const authenticateJWT = (req, res, next) => {
  console.log("Incomming user...");
  // var cookie = req.cookies
  var cookie = req.session.token;
  console.log("cookie : ", cookie);
  console.log("next : ", req.session.token);

  if (cookie) {
    jwt.verify(cookie, accessTokenSecret, (err, user) => {
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
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID =
  "867773542903-0hlkemtvhg4s5fuceopsh111kd729ulj.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "bbFoC3kM7XkJzf94EvYTNYcv";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://oauth.kinkhorn.pongpich.xyz/oauth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

app.get(
  "/oauth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/oauth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect("/success");
  }
);

/* APIs */
app.get("/success", (req, res) => {
  const accessToken = jwt.sign(
    { user: userProfile["_json"] },
    accessTokenSecret
  );
  // var date = new Date();
  // date.setDate(date.getDate() + 2);

  req.session = {
   token: accessToken,
  }
  // res.cookie('token', accessToken, {
  //   path     : '/',
  //   domain   : 'kinkhorn.pongpich.xyz',
  //   expires: date,
  //   secure: true, // set to true if your using https
  //   httpOnly: false,
  // });

  const person = new People({
    name: userProfile["_json"].name,
    given_name: userProfile["_json"].given_name,
    family_name: userProfile["_json"].family_name,
    picture: userProfile["_json"].picture,
    email: userProfile["_json"].email,
    email_verified: userProfile["_json"].email_verified,
    hd: userProfile["_json"].hd,
  });

  db.collection("people")
    .find({}, { name: person.name })
    .toArray(function (err, result) {
      if (err) throw err;
      if (result.length === 0) {
        person.save().then((saveUser) => {
          res.writeHead(302, {
            Location: "https://kinkhorn.pongpich.xyz/",
          });
          res.end();
        });
      } else {
        res.writeHead(302, {
          Location: "https://kinkhorn.pongpich.xyz/",
        });
        res.end();
      }
    });
});

app.get("/oauth/user/info", authenticateJWT, (req, res) => {
  var cookie = req.cookies;
  var decoded = jwt.decode(cookie["token"]);
  var money = 0;
  db.collection("people")
    .find({}, { name: decoded.name })
    .toArray(function (err, result) {
      if (err) throw err;
      console.log(result[0]);
      money = result[0].money;
      user = result[0]._id;
      decoded["money"] = money;
      decoded["user_id"] = user;
      console.log(decoded);
      return res.json(decoded);
    });
});

app.get("/oauth/logout", (req, res) => {
  res.cookie("token", null, {
    path: "/",
    domain: "kinkhorn.pongpich.xyz",
    maxAge: 0,
    secure: true, // set to true if your using https
    httpOnly: false,
  });
  res.writeHead(302, {
    Location: "https://kinkhorn.pongpich.xyz/",
  });
  res.end();
});

app.get("/error", (req, res) => res.send("error logging in"));

app.put("/oauth/topup/:money", authenticateJWT, (req, res) => {
  try {
    var cookie = req.cookies;
    var decoded = jwt.decode(cookie["token"]);
    var money_change = parseInt(req.params.money);
    db.collection("people")
      .find({}, { name: decoded.name })
      .toArray(function (err, result) {
        if (err) throw err;
        var currMoney = result[0].money + money_change;
        db.collection("people").updateOne(
          { name: decoded.user.name },
          { $set: { money: currMoney } },
          function (err, res) {
            if (err) throw err;
            console.log("1 record updated");
          }
        );
      });
  } catch (e) {
    res.status(404).send("Error!");
  }
  res.sendStatus(200);
});

app.put("/oauth/pay/:price", authenticateJWT, (req, res) => {
  try {
    var cookie = req.cookies;
    var decoded = jwt.decode(cookie["token"]);
    var money_change = parseInt(req.params.price);
    db.collection("people")
      .find({}, { name: decoded.name })
      .toArray(function (err, result) {
        if (err) throw err;
        if (result[0].money < money_change) {
          res.status(404).send("Not enough money");
          return;
        }
        var currMoney = result[0].money - money_change;
        db.collection("people").updateOne(
          { name: decoded.user.name },
          { $set: { money: currMoney } },
          function (err, res) {
            if (err) throw err;
            console.log("1 record updated");
          }
        );
        res.status(200).send("Paid!");
      });
  } catch (e) {
    res.status(404).send("Error!");
  }
});
