const express = require('express');
const router = express.Router();
const { Session, Mouse } = require('./models');

router.post('/new/session', (req, res) => {
  console.log(req.body);
  Session.create(req.body).then(resp => {
    console.log('RESPONSE', resp);
    res.send('Post request received!');
  }).catch(e => console.log(e));
});

router.post('/new/mouse', (req, res) => {
  console.log('inside adding new mouse')
  console.log(req.body);
  Mouse.create(req.body).then(resp => {
    console.log('RESPONSE', resp);
    res.send('New Mouse created!');
  }).catch(e => console.log(e));
});

router.get('/led', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;
