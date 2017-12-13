const express = require('express');
const router = express.Router();
const { Session } = require('./models');

router.post('/hamster', (req, res) => {
  console.log(req.body);
  Session.create(req.body).then(resp => {
    console.log('RESPONSE', resp);
    res.send('Post request received!');
  }).catch(e => console.log(e));
});

router.get('/led', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;
