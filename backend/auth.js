const express = require('express');
const router = express.Router();

const User = require('./models').User;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Passport stuff here
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user, done) => {
  console.log('in serialize user')
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('in deserialize user')
  User.findById(id).then(user => done(null, user)).catch(e => console.log(e));
});

passport.use(new LocalStrategy((username, password, done) => {
  console.log('inside Local Strategy')
  User.findOne({ where: { username } }).then(user => {
    if (!user) done(null, false);
    else if (user.password === password) done(null, user);
    else done(null, false);
  }).catch(e => {
    console.log(e)
    done(e)
  });
}));

// login routes go here
router.get('/isLoggedIn', (req, res) => {
  if (req.user) res.send(true);
  else res.send(false);
});

router.post('/register', (req, res) => {
  User.create(req.body)
    .then(resp => res.send({ success: true, response: resp }))
    .catch(e => res.json({success: false, error: e.errors[0].message}));
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('user', req.user)
  if (req.user) res.send(true);
  else res.status(401).send('incorrect username/password combination');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.send(true);
});

module.exports = router;
