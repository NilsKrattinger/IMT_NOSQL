const express = require('express');
const {createSchema, populateFollowers, populateProducts} = require("../src/utils/pg-utils");
const router = express.Router();

router.post('/createSchema', async (req, res) => {
    try {
        const start = Date.now();
        await createSchema();
        const duration = Date.now() - start;
        res.set('X-Request-Duration', `${duration}ms`);
        res.sendStatus(200);
    } catch (err) {
        console.error('Error creating schema:', err);
        res.status(500).send('Error creating schema.');
    }
});

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


router.get('/productSalesFromNetwork', async (req, res) => {
    try {
        const start = Date.now();


        const duration = Date.now() - start;
        res.set('X-Request-Duration', `${duration}ms`);
        res.sendStatus(200)

    } catch (err) {
        console.error('Error getting', err);
        res.status(500).send('Error populating products table.');
    }
});


router.get('/specificProductSaleFromNetwork', async (req, res) => {
    try {
        const start = Date.now();


        const duration = Date.now() - start;
        res.set('X-Request-Duration', `${duration}ms`);
        res.sendStatus(200)

    } catch (err) {
        console.error('Error getting', err);
        res.status(500).send('Error populating products table.');
    }
});


router.get('/productVirality', async (req, res) => {
    try {
        const start = Date.now();


        const duration = Date.now() - start;
        res.set('X-Request-Duration', `${duration}ms`);
        res.sendStatus(200)

    } catch (err) {
        console.error('Error getting', err);
        res.status(500).send('Error populating products table.');
    }
});


router.get('/userCount', async (req, res) => {
    try {
        const start = Date.now();


        const duration = Date.now() - start;
        res.set('X-Request-Duration', `${duration}ms`);
        res.sendStatus(200)

    } catch (err) {
        console.error('Error getting', err);
        res.status(500).send('Error populating products table.');
    }
});


router.get('/productCount', async (req, res) => {
    try {
        const start = Date.now();


        const duration = Date.now() - start;
        res.set('X-Request-Duration', `${duration}ms`);
        res.sendStatus(200)

    } catch (err) {
        console.error('Error getting', err);
        res.status(500).send('Error populating products table.');
    }
});


router.get('/purchaseCount', async (req, res) => {
    try {
        const start = Date.now();


        const duration = Date.now() - start;
        res.set('X-Request-Duration', `${duration}ms`);
        res.sendStatus(200)

    } catch (err) {
        console.error('Error getting', err);
        res.status(500).send('Error populating products table.');
    }
});


router.get('/followersCount', async (req, res) => {
    try {
        const start = Date.now();


        const duration = Date.now() - start;
        res.set('X-Request-Duration', `${duration}ms`);
        res.sendStatus(200)

    } catch (err) {
        console.error('Error getting', err);
        res.status(500).send('Error populating products table.');
    }
});


module.exports = router;


