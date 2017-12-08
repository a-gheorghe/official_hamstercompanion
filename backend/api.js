const express = require('express');
const router = express.Router();

// const { Experiment } = require('./models');

router.get('/experiments', (req, res) => {
  console.log(req.body);
  res.send('Post request received!');
});

router.get('/led', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;
