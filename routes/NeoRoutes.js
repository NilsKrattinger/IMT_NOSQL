const express = require('express');
const {populateUsers} = require("../src/utils/pg-utils");
const common = require("../src/model/Common");
const repo = require("../src/Repository/Neo4JNetworkRepository");
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
        await populateUsers(10);PgSqlNetworkRepository
        const duration = Date.now() - start;
        res.set('X-Request-Duration', `${duration}ms`);
        res.sendStatus(200)
    } catch (err) {
        console.error('Error populating users table:', err);
        res.status(500).send('Error populating users table.');
    }
});

router.get('/userCount', async (req, res) => {
    try {
        const rep = await common.getUserCount(repo)
        res.send(JSON.stringify(rep))
    } catch (err) {
        console.error('Error getting', err);
        res.status(500).send('Error populating products table.');
    }
});


router.get('/productCount', async (req, res) => {
    try {
        const rep = await common.getProductCount(repo)
        res.send(JSON.stringify(rep))
    } catch (err) {
        console.error('Error getting', err);
        res.status(500).send('Error populating products table.');
    }
});


router.get('/purchaseCount', async (req, res) => {
    try {
        const rep = await common.getPurchasedCount(repo)
        res.send(JSON.stringify(rep))
    } catch (err) {
        console.error('Error getting', err);
        res.status(500).send('Error populating products table.');
    }
});


router.get('/followerCount', async (req, res) => {
    try {
        const rep = await common.getFollowersCount(repo)
        res.send(JSON.stringify(rep))
    } catch (err) {
        console.error('Error getting', err);
        res.status(500).send('Error populating products table.');
    }
});

module.exports = router;
