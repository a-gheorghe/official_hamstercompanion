const express = require('express');
const router = express.Router();
const User = require('./models').User;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Passport stuff here
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user)).catch(e => console.log(e));
});

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ where: { username } }).then(user => {
    console.log('HELLO', user.password, password);
    if (!user) done(null, false);
    else if (user.password === password) done(null, user);
    else done(null, false);
  }).catch(e => console.log(e));
}));

router.use(passport.initialize());
router.use(passport.session());

// login routes go here
router.post('/register', (req, res) => {
  User.create({username: req.body.username, password: req.body.password})
    .then(resp => res.send({ success: true, response: resp }))
    .catch(e => res.json({success: false, error: e}));
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/experiments',
  failureRedirect: '/login'
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
