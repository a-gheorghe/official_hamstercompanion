const express = require('express');
const router = express.Router();
const { Session } = require('./models');

router.post('/hamster', (req, res) => {
  console.log(req.body);
  Session.create(req.body).then(resp => {
    console.log('RESPONSE', resp);
  }).catch(e => console.log(e));
  res.send('Post request received!');
});

router.get('/led', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;
