const {pgPool} = require('../provider/Pg-sql')

const type = 'Pg';
// Function to create the schema
async function createSchema() {
    await pgPool.query(`
        CREATE TABLE IF NOT EXISTS users
        (
            id   SERIAL PRIMARY KEY,
            name TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS followers
        (
            user_id     INTEGER NOT NULL,
            follower_id INTEGER NOT NULL,
            PRIMARY KEY (user_id, follower_id),
            FOREIGN KEY (user_id) REFERENCES users (id),
            FOREIGN KEY (follower_id) REFERENCES users (id)
        );

        CREATE TABLE IF NOT EXISTS products
        (
            id    SERIAL PRIMARY KEY,
            name  TEXT           NOT NULL,
            price NUMERIC(10, 2) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS purchases
        (
            user_id    INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            PRIMARY KEY (user_id, product_id),
            FOREIGN KEY (user_id) REFERENCES users (id),
            FOREIGN KEY (product_id) REFERENCES products (id)
        );
    `);
}

// Function to populate the users table
async function populateUsers(numUsers) {
    let promisTable = []
    for (let i = 1; i <= numUsers; i++) {
        let promise = pool.query(`
            INSERT INTO users (name)
            VALUES ($1)
        `, [`user${i}`]);
        promisTable.push(promise)
    }
    await Promise.all(promisTable)
}

// Function to populate the followers table
async function populateFollowers() {
    const users = await pool.query(`
        SELECT id
        FROM users
    `);

    for (let i = 0; i < users.rowCount; i++) {
        const user_id = users.rows[i].id;
        const numFollowers = Math.floor(Math.random() * (3 - 1) + 1); //was (20 - 5) + 5)

        for (let j = 0; j < numFollowers; j++) {
            const follower_id = Math.floor(Math.random() * users.rowCount) + 1;

            if (follower_id !== user_id) {
                await pool.query(`
                    INSERT INTO followers (user_id, follower_id)
                    VALUES ($1, $2)
                `, [user_id, follower_id]);
            }
        }
    }
}

// Function to populate the products table
async function populateProducts(numProducts) {
    for (let i = 1; i <= numProducts; i++) {
        await pool.query(`
            INSERT INTO products (name, price)
            VALUES ($1, $2)
        `, [`product${i}`, Math.floor(Math.random() * (100 - 1) + 1)]);
    }
}

// Function to populate the purchases table
async function populatePurchases() {
    const users = await pool.query(`
        SELECT id
        FROM users
    `);

    const products = await pool.query(`
        SELECT id
        FROM products
    `);

    for (let i = 0; i < users.rowCount; i++) {
        const user_id = users.rows[i].id;
        const numPurchases = Math.floor(Math.random() * 2); //was 6

        for (let j = 0; j < numPurchases; j++) {
            const product_id = products.rows[Math.floor(Math.random() * products.rowCount)].id;

            await pool.query(`
                INSERT INTO purchases (user_id, product_id)
                VALUES ($1, $2)
            `, [user_id, product_id]);
        }
    }
}


function parseRes(res){
    const rows = res.rows;
    const parsedRes = []

    for (const rowsKey in rows) {
        const row = rows[rowsKey]
        const parsedObj= {}
        for (const field in row) {
            parsedObj[field] = row[field]
        }
        parsedRes.push(parsedObj)
    }

    return parsedRes
}


module.exports = {createSchema, populateUsers, populateProducts, populateFollowers, populatePurchases,parseRes,type}
