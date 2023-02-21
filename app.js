const express = require('express');
const app = express();

// Import the functions we created earlier
const { createSchema, populateUsers, populateFollowers, populateProducts, populatePurchases } = require('./db-utils');
const {Pool} = require("pg");


const pool = new Pool({
    user: "postgres",
    host: "database",
    database: "nosql",
    password: "postgres",
    port: "5432",
});


// Middleware to calculate request execution time
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`Request to ${req.path} took ${duration} ms`);
    });
    next();
});

// Route to create the schema
app.get('/create-schema', async (req, res) => {
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

// Route to populate the users table
app.get('/populate-users', async (req, res) => {
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

// Route to populate the followers table
app.get('/populate-followers', async (req, res) => {
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
app.get('/populate-products', async (req, res) => {
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

// Route to populate the purchases table
app.get('/populate-purchases', async (req, res) => {
    try {
        const start = Date.now();
        await populatePurchases();
        const duration = Date.now() - start;
        res.set('X-Request-Duration', `${duration}ms`);
        res.sendStatus(200)

    } catch (err) {
        console.error('Error populating purchases table:', err);
        res.status(500).send('Error populating purchases table.');
    }
});

// Route to get all followers of a user within 3 degrees of separation
app.get('/followers/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const start = Date.now();

    const result = await pool.query(`
        WITH RECURSIVE followers_CTE AS (
            SELECT distinct user_id, follower_id, 1 AS level
            FROM followers
            WHERE user_id = $1
            UNION ALL
            SELECT f.user_id, f.follower_id, level + 1 AS level
            FROM followers f
            INNER JOIN followers_CTE ON f.user_id = followers_CTE.follower_id
            WHERE level < 3
        )
        SELECT DISTINCT *
        FROM followers_CTE;
  `, [userId]);

    const duration = Date.now() - start;
    res.set('X-Request-Duration', `${duration}ms`);
    res.json(result);
});


// Start the server
app.listen(8080, () => {
    console.log('Server started on port 8080.');
});
