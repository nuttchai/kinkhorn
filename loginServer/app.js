const express = require("express");
const app = express();
const session = require("express-session");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const People = require("./models/people");
const crypto = require("crypto");

app.use(bodyParser.json());

// mongodb
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
app.use(cookieParser());
// var date = new Date();
// date.setDate(date.getDate() + 2);
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
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

// var idCardInserted = {
//   "name" : null,
//   "system" : null,
//   "mac" : null,
// }
let machineArray = new Array()
let idArray = new Array()

/* JWT */
const accessTokenSecret = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
  // console.log("Incomming user...");
  var cookie = req.cookies;
  // console.log("cookie : ", cookie['token']);

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
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACKURL,
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
    res.redirect("/oauth/success");
  }
);

/* APIs */
app.get("/oauth/success", (req, res) => {
  const accessToken = jwt.sign(
    { user: userProfile._json},
    accessTokenSecret
  );

  var date = new Date();
  date.setDate(date.getDate() + 2);

  res.cookie('token', accessToken, {
    expires: date,
    secure: true, // set to true if your using https
    httpOnly: false,
  });

  const person = new People({
    name: userProfile["_json"].name,
    given_name: userProfile["_json"].given_name,
    family_name: userProfile["_json"].family_name,
    picture: userProfile["_json"].picture,
    email: userProfile["_json"].email,
    role: "customer",
    registered: false,
  });

  db.collection("people")
    .find({"name": person.name})
    .toArray(function (err, result) {
      console.log(result)
      if (err) throw err;
      if (result.length === 0) {
        console.log("New person")
        person.save().then((saveUser) => {
          res.writeHead(302, {
            Location: "https://" + process.env.DOMAIN,
          });
          res.end();
        });
      } else {
        res.writeHead(302, {
          Location: "https://" + process.env.DOMAIN,
        });
        res.end();
      }
    });
});

app.get("/oauth/user/info", authenticateJWT, (req, res) => {
  var cookie = req.cookies;
  var decoded = jwt.decode(cookie["token"]);
  // console.log(decoded.user.name)
  db.collection("people")
    .find({ "name": decoded.user.name })
    .toArray(function (err, result) {
      console.log(result)
      if (err) throw err;
      return res.json(result[0]);
    });
});

app.get("/oauth/logout", (req, res) => {
  res.cookie('token', null, {
    expires: Date.now(),
    maxAge: 0,
    secure: true, // set to true if your using https
    httpOnly: false,
  });
  res.writeHead(302, {
    Location: "https://" + process.env.DOMAIN,
  });
  res.end();
});

app.get("/error", (req, res) => res.send("error logging in"));

app.put("/oauth/topup/:money", authenticateJWT, (req, res) => {
  try {
    var cookie = req.cookies;
    var decoded = jwt.decode(cookie["token"]);
    var money_change = parseInt(req.params.money);
    // console.log(decoded.user.name)
    db.collection("people")
      .find({ "name": decoded.user.name })
      .toArray(function (err, result) {
        if (err) throw err;
        // console.log(result[0])
        var currMoney = result[0].money + money_change;
        db.collection("people").updateOne(
          { "name": decoded.user.name },
          { $set: { "money": currMoney } },
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

app.put("/oauth/pay/:money", authenticateJWT, (req, res) => {
  try {
    var cookie = req.cookies;
    var decoded = jwt.decode(cookie["token"]);
    var money_change = parseInt(req.params.money);
    // console.log(decoded.user.name)
    db.collection("people")
      .find({ "name": decoded.user.name })
      .toArray(function (err, result) {
        if (err) throw err;
        if (result[0].money < money_change) {
          res.status(404).send("Not enough money");
          return;
        }
        var currMoney = result[0].money - money_change;
        db.collection("people").updateOne(
          { "name": decoded.user.name },
          { $set: { "money": currMoney } },
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

app.get('/oauth/card/exchange', (req, res) => {
  var date = new Date();
  date.setDate(date.getDate() + 10);
  for (var i = 0; i < idArray.length; i++) {
    console.log(idArray[i])
    if (idArray[i].taken === false) {
      console.log("before ", idArray[i].taken)
      res.cookie('machine_token', idArray[i].id, {
        expires: date,
        secure: true, // set to true if your using https
        httpOnly: false,
      });
      idArray[i].taken = true
      console.log("after ", idArray[i].taken)
      break;
    }
  }
  res.writeHead(302, {
    Location: "https://" + process.env.DOMAIN,
  });
  res.end();
})

app.put('/oauth/card/insert', (req, res) => {
  var index = machineArray.findIndex(x => x.machine == req.body.machine)
  // console.log(index)
  if (index === -1) {
    machineArray.push(req.body)
  } else {
    // console.log(machines[index])
    machineArray[index].data.name = req.body.data.name
    machineArray[index].data.given_name = req.body.data.given_name
    machineArray[index].data.family_name = req.body.data.family_name
    machineArray[index].data.system = req.body.data.system
    machineArray[index].data.mac = req.body.data.mac
    machineArray[index].status = req.body.status
  }
  res.send(req.body);    // echo the result back
});

app.get('/oauth/card/current', (req, res) => {
  console.log(idArray)
  return res.json(machineArray)
});

app.get('/oauth/card/generate', (req, res) => {
  var id = crypto.randomBytes(16).toString("hex")
  idArray.push({"id": id, "taken": false})
  return res.json({"machine_token": id})
})

app.get('/oauth/card/login', (req, res) => {

  var cookie = req.cookies;
  var machine_id = cookie["machine_token"];
  var item
  
  var person = new People({
    name: "",
    given_name: "",
    family_name: "",
    picture: "",
    email: "",
    role: "customer",
    registered: false,
    money: 0,
  });

  if (machineArray.length === 0) {
    res.writeHead(401, {
      Location: "https://" + process.env.DOMAIN,
    });
    res.end();
  }

  machineArray.map(ele => ele.machine === machine_id ? item = ele : item = null)
  if (item) {
    person.name = item.data.name
    person.given_name = item.data.given_name
    person.family_name = item.data.family_name
  } 

  db.collection("people")
    .find({"name": person.name})
    .toArray(function (err, result) {
      console.log(result[0])
      if (result.length === 0) {
        console.log("New person")
        person.save()
      } else {
        console.log("RESULT", result[0])
        person = result[0]
      }
    })
  console.log("RESULT2", person)
  const accessToken = jwt.sign(
    { "user": person},
    accessTokenSecret
  );

  console.log(accessToken)

  var date = new Date();
  date.setDate(date.getDate() + 2);

  res.cookie('token', accessToken, {
    expires: date,
    secure: true, // set to true if your using https
    httpOnly: false,
  });

  res.writeHead(302, {
    Location: "https://" + process.env.DOMAIN,
  });
  res.end();

})