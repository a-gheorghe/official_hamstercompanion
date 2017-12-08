const express = require('express');
const router = express.Router();

const { Experiment } = require('./models');

router.get('/experiments', (req, res) => {
  Experiment.findAll().then(resp => {
    res.json(resp);
  }).catch(e => console.log(e));
});

router.get('/experiment/:id', (req, res) => {
  Experiment.findById(req.params.id).then(resp => {
    res.json(resp);
  }).catch(e => console.log(e));
});

module.exports = router;
