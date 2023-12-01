require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
const flash = require('express-flash');
const session = require('express-session');
const routers = require('./router');
const passport = require('./utils/passport');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routers);

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
)

module.exports = app