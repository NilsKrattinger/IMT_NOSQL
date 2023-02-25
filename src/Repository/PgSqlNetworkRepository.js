const {pgPool} = require('../provider/Pg-sql')
const utils = require('../utils/pg-utils')

async function getSalesProductByNetwork(userId) {
    const start = Date.now();
    const result = await pgPool.query(`WITH RECURSIVE followers_CTE AS (SELECT distinct user_id, follower_id, 1 AS level
                                                                        FROM followers
                                                                        WHERE user_id = $1
                                                                        UNION ALL
                                                                        SELECT f.user_id, f.follower_id, level + 1 AS level
                                                                        FROM followers f
                                                                                 INNER JOIN followers_CTE ON f.user_id = followers_CTE.follower_id
                                                                        WHERE level < 4)

                                       SELECT product_id, count(*) as nb_purchase
                                       from purchases p
                                                JOIN products on p.product_id = id
                                       WHERE p.user_id in (SELECT DISTINCT follower_id
                                                           FROM followers_CTE)
                                         AND p.user_id <> $1
                                       group by (product_id);
    `, [userId]);

    const duration = Date.now() - start;
    let returnValue = {}
    returnValue["Duration"] = duration;
    returnValue["Data"] = utils.parseRes(result);
    return returnValue;
}

async function getSaleForProductByNetwork(userId, productName) {
    const start = Date.now();
    const result = await pgPool.query(`
        WITH RECURSIVE followers_CTE AS (SELECT distinct user_id, follower_id, 1 AS level
                                         FROM followers
                                         WHERE user_id = $1
                                         UNION ALL
                                         SELECT f.user_id, f.follower_id, level + 1 AS level
                                         FROM followers f
                                                  INNER JOIN followers_CTE ON f.user_id = followers_CTE.follower_id
                                         WHERE level < 4)

        SELECT product_id, count(*) as nb_purchase
        from purchases p
                 JOIN products on p.product_id = id
        WHERE p.user_id in (SELECT DISTINCT follower_id
                            FROM followers_CTE)
          and name = $2
          AND p.user_id <> $1
        group by (product_id);
    `, [userId, productName]);

    const duration = Date.now() - start;
    let returnValue = {}
    returnValue["Duration"] = duration;
    returnValue["Data"] = utils.parseRes(result);
    return returnValue;
}


async function getProductVirality(productName) {
    const start = Date.now();
    const result = await pgPool.query(`
        WITH RECURSIVE followers_CTE AS (SELECT distinct user_id, follower_id, 1 AS level
                                         FROM followers
                                         WHERE user_id in (select user_id from purchases WHERE product_id = $1)
                                         UNION ALL
                                         SELECT f.user_id, f.follower_id, level + 1 AS level
                                         FROM followers f
                                                  INNER JOIN followers_CTE ON f.user_id = followers_CTE.follower_id
                                         WHERE level < 4)

        SELECT distinct follower_id
        FROM followers_CTE
        WHERE followers_CTE.follower_id in (select user_id from purchases WHERE product_id = $1)
          and level < 4
    `, [productName]);

    const duration = Date.now() - start;
    let returnValue = {}
    returnValue["Duration"] = duration;
    returnValue["Data"] = utils.parseRes(result);
    return returnValue;
}

async function getUserCount() {
    const start = Date.now();
    const result = await pgPool.query(`
        SELECT count(*)
        from users;
    `);
    const duration = Date.now() - start;
    let returnValue = {}
    returnValue["Duration"] = duration;
    returnValue["Data"] = utils.parseRes(result);
    return returnValue;
}

async function getProductCount() {
    const start = Date.now();
    const result = await pgPool.query(`
        SELECT count(*)
        from products;
    `);
    const duration = Date.now() - start;
    let returnValue = {}
    returnValue["Duration"] = duration;
    returnValue["Data"] = utils.parseRes(result);
    return returnValue;
}


async function getFollowersCount() {
    const start = Date.now();
    const result = await pgPool.query(`
        SELECT count(*)
        from followers;
    `);
    const duration = Date.now() - start;
    let returnValue = {}
    returnValue["Duration"] = duration;
    returnValue["Data"] = utils.parseRes(result);
    return returnValue;
}

async function getPurchasedCount() {
    const start = Date.now();
    const result = await pgPool.query(`
        SELECT count(*)
        from purchases;
    `);
    const duration = Date.now() - start;
    let returnValue = {}
    returnValue["Duration"] = duration;
    returnValue["Data"] = utils.parseRes(result);
    return returnValue;
}

async function createUsers(userNumber, batchSize) {
    const TotalNumberOfBatch = Math.trunc(userNumber / batchSize)
    const RemainingPart = userNumber - (TotalNumberOfBatch * batchSize)

    const start = Date.now();
    const result = []
    for (let i = 0; i < TotalNumberOfBatch; i++) {
        let batch_res = await pgPool.query(`
           call insert_users($1)
           `, [batchSize]);
        result.push(batch_res)
    }

    if (RemainingPart) {
        let batch_res = await pgPool.query(`
        call insert_users($1)
            `, [RemainingPart]);
        result.push(batch_res)
    }

    const duration = Date.now() - start;
    let returnValue = {}
    returnValue["Duration"] = duration;
    returnValue["Data"] = utils.parseRes(result.join());
    return returnValue;
}


async function createProduct(number, batchSize) {
    const TotalNumberOfBatch = Math.trunc(number / batchSize)
    const RemainingPart = number - (TotalNumberOfBatch * batchSize)

    const start = Date.now();
    const result = []
    for (let i = 0; i < TotalNumberOfBatch; i++) {
        let batch_res = await pgPool.query(`
           call insert_products($1)
           `, [batchSize]);
        result.push(batch_res)
    }

    if (RemainingPart) {
        let batch_res = await pgPool.query(`
        call insert_products($1)
            `, [RemainingPart]);
        result.push(batch_res)
    }

    const duration = Date.now() - start;
    let returnValue = {}
    returnValue["Duration"] = duration;
    returnValue["Data"] = utils.parseRes(result.join());
    return returnValue;
}

module.exports = {
    getSalesProductByNetwork: getSalesProductByNetwork,
    getSaleForProductByNetwork: getSaleForProductByNetwork,
    getProductVirality: getProductVirality,
    getUserCount: getUserCount,
    getProductCount: getProductCount,
    getPurchasedCount: getPurchasedCount,
    getFollowersCount: getFollowersCount,
    createUsers:createUsers,
    createProduct:createProduct,
}
