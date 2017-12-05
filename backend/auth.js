const express = require('express');
const router = express.Router();

module.exports = () => {
    // login routes go here
    router.get('login', (req, res) => {
        res.send('nothing');
    });

    return router;
};
