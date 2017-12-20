const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

// Body parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(session({
  secret: process.env.PASSPORT_SECRET,
  name: 'Catscookie',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

// route files
const piRoutes = require('./backend/piRoutes');
const auth = require('./backend/auth');
const api = require('./backend/api');

// Rasberry Pi API routes
app.use('/', piRoutes);
app.use('/api', auth);
app.use('/api', api);

app.use('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // For React/Redux
});


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
