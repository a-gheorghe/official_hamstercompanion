const express = require('express');
const router = express.Router();

router.get('/hamster', (req, res) => {
    console.log('Hello World!');
    res.send('hello world');
});

module.exports = router;
