const express = require('express');
const {populateUsers} = require("../src/utils/pg-utils");
const router = express.Router();

router.get('/populateProducts', function(req, res) {
    res.send('Birds home page');
});
router.get('/populateUsers', function(req, res) {
res.send('Birds home page');
});

router.get('/populate-users', async (req, res) => {
    try {
        const start = Date.now();
        await populateUsers(10);
        const duration = Date.now() - start;
        res.set('X-Request-Duration', `${duration}ms`);
        res.sendStatus(200)
    } catch (err) {
        console.error('Error populating users table:', err);
        res.status(500).send('Error populating users table.');
    }
});

module.exports = router;
