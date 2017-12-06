const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// route files
const routes = require('./backend/routes');
const auth = require('./backend/auth');

// connect to postgres database

// const pg = require('./backend/database.js');

// require user model
// const User = require('./models/models.js').User;

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const app = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

// Passport stuff here
app.use(session({
  secret: process.env.PASSPORT_SECRET,
  name: 'Catscookie',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // User.findById(id).then(user => done(null, user)).catch(e => console.log(e));
});

passport.use(new LocalStrategy((username, password, done) => {
    // User.findOne({ where: { username } }).then(user => {
    //     if (!user) done(null, false);
    //     else if (user.password === password) done(null, user);
    //     else done(null, false);
    // }).catch(e => console.log(e));
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // For React/Redux
});

app.use('/', auth());
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, error => {
  error
        ? console.error(error)
        : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
