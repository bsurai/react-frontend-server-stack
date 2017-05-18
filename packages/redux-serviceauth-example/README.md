## How to start

You should start both client and server.

Client
```
cd client
npm i
npm start
```

Server
```
cd server
npm i
npm start
```

## Providers

### Facebook

The Facebook strategy allows users to log in to a web application using their Facebook account. Internally, Facebook authentication works using OAuth 2.0.

### Twitter

The Twitter strategy allows users to sign in to a web application using their Twitter account. Internally, Twitter authentication works using OAuth 1.0a.

Here you have to use express sessions.

```
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true } <= use it only with HTTPS connection
}));
```

### Google

The Google strategy allows users to sign in to a web application using their Google account. Google used to support OpenID internally, but it now works based on OpenID Connect and supports oAuth 1.0 and oAuth 2.0. The example use oAuth 2.0.