const express = require('express');
const router = express.Router();

const { Experiment } = require('./models');

router.get('/experiments', (req, res, next) => {
  Experiment.findAll().then(resp => {
    res.json(resp);
    next();
  }).catch(e => console.log(e));
});

router.get('/led', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;
