const express = require('express');
const router = express.Router();

router.get('/hamster', (req, res) => {
  res.send('Hello World!');
});

router.get('/led', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;
