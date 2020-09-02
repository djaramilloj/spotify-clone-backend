require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var session = require('express-session');
const cors = require('cors');
const connectMongo = require('connect-mongo')(session);
const db = require('./auth/mongo');
const routes = require('./network/routes');
const firebase = require("firebase/app");
require("firebase/auth");

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
}

db(process.env.MONGO_URI); // mongo connection

app.use(cors());
app.use(session({
    secret: 'aleatorio',
    resave: true,
    saveUninitialized: true,
    store: new connectMongo({
        url: process.env.MONGO_URI,
        autoReconnect: true
    }),
    cookie: { secure: false },
    maxAge: Date.now() + (30 * 86400 * 1000)
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
firebase.initializeApp(firebaseConfig);
routes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app listening in http://localhost:${port}`))