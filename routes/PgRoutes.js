const express = require('express');
const {createSchema, populateFollowers, populateProducts} = require("../src/utils/pg-utils");
const router = express.Router();
const repo = require('../src/Repository/PgSqlNetworkRepository')
const network = require('../src/model/Network')
const common = require('../src/model/Common')

// Route to populate the followers table
router.post('/populateUsers', async (req, res) => {
    try {
        const start = Date.now();
        await populateFollowers();
        const duration = Date.now() - start;
        res.set('X-Request-Duration', `${duration}ms`);
        res.sendStatus(200)

    } catch (err) {
        console.error('Error populating followers table:', err);
        res.status(500).send('Error populating followers table.');
    }
});


// Route to populate the products table
router.post('/populateProducts', async (req, res) => {
    try {
        const start = Date.now();
        await populateProducts(10);
        const duration = Date.now() - start;
        res.set('X-Request-Duration', `${duration}ms`);
        res.sendStatus(200)

    } catch (err) {
        console.error('Error populating products table:', err);
        res.status(500).send('Error populating products table.');
    }
});


router.get('/productSalesFromNetwork/:userName', async (req, res) => {
    try {
        const userName = req.params.userName
        const rep = await network.getSalesProductByNetwork(repo,userName)
        res.send(JSON.stringify(rep))
    } catch (err) {
        console.error('Error getting', err);
        res.status(500).send('Error populating products table.');
    }
});


router.get('/specificProductSaleFromNetwork/:userName/:productName', async (req, res) => {
    try {
        const userName = req.params.userName
        const productName = req.params.productName

        const rep = await network.getSalesProductByNetwork(repo,userName,productName)
        res.send(JSON.stringify(rep))
    } catch (err) {
        console.error('Error getting', err);
        res.status(500).send('Error populating products table.');
    }
});


router.get('/productVirality/:productName', async (req, res) => {
    try {
        const productName = req.params.productName
        const rep = await network.getProductVirality(repo,productName)
        res.send(JSON.stringify(rep))
    } catch (err) {
        console.error('Error getting', err);
        res.status(500).send('Error populating products table.');
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


router.get('/followersCount', async (req, res) => {
    try {
        const rep = await common.getFollowersCount(repo)
        res.send(JSON.stringify(rep))
    } catch (err) {
        console.error('Error getting', err);
        res.status(500).send('Error populating products table.');
    }
});


module.exports = router;


