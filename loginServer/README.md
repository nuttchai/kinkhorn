# READ ME
## Login server

This folder contains the authentication part of the system. The authentication uses google oauth2 with jwt stores in cookie.  
``This server will run on port 8080``

## Installtion

```bash
npm i --save express express-session body-parser jsonwebtoken cookie-parser
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

+ `/auth/google`    Google login
+ `/api/user/info`  Get user's information after logged in
