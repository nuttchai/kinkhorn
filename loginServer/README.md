# Login server

This folder contains the authentication part of the system. The authentication uses google oauth2 with jwt stores in cookie.  
``This server will run on port 8080``

## Installtion

```bash
npm i --save express express-session body-parser jsonwebtoken cookie-parser mongoose
```
or
```bash
npm install
```

## Run 

```bash
node app.js
```

### PATHs  

+ GET `/oauth/google`    Google login
+ GET `/oauth/user/info`  Get user's information after logged in
+ PUT `/oauth/pay/:price`  Deduct money from the account
+ PUT `/oauth/topup/:price`  Add money to the account
