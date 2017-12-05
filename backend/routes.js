const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello world');
});

router.get('/hamster', (req, res) => {
  console.log('Hello World!');
  res.send('hello world');
});

module.exports = router;
