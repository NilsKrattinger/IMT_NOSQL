const {driver} = require('../provider/Neo4J')
const utils = require('../utils/neo4j-utils')

async function getSalesProductByNetwork(userName) {
    const start = Date.now();
    try {
        const session = driver.session()
        const result = await session.run('MATCH (a:Person{name:$name})-[r1:followedBy *..4]->(b:Person)-[r2:haveBought]->(c:Product) WHERE a<>b WITH DISTINCT a, b, c WITH c, COUNT(c) as d RETURN c, d,',
            {name: userName}
        )
        await session.close()

        const duration = Date.now() - start;
        let returnValue = {}
        returnValue["Duration"] = duration;
        returnValue["Data"] = utils.parseRes(result);
        return returnValue;
    } catch (e) {
        throw (e);
    }
}
    async function getSaleForProductByNetwork(userId, productName) {
        const start = Date.now();
        try {
            const session = driver.session()

            const result = await session.run('MATCH (a:Person{name:$username})-[r1:followedBy *..4]->(b:Person)-[r2:haveBought]->(c:Product {name:$product_name}) WHERE a<>b WITH DISTINCT a, b, c WITH c, COUNT(c) as d RETURN c, d,',
                {user_name: userName, product_name:productName}
            )
            await session.close()

            const duration = Date.now() - start;
            let returnValue = {}
            returnValue["Duration"] = duration;
            returnValue["Data"] = utils.parseRes(result);
            return returnValue;
        }
        catch (e)
        {
            throw (e);
        }
    }


    async function getProductVirality(productName, circleSize) {
        const start = Date.now();
        try {
            const session = driver.session()

            const result = await session.run('MATCH (n:Person)-[:followedBy *$circle_size..$circle_size]->(p:Person)-[:haveBought]->(c:Product {name:$product_name}) WHERE (n)-[:haveBought]->(c) AND n<>p RETURN p',
                {product_name:productName,circle_size:circleSize}
            )
            await session.close()

            const duration = Date.now() - start;
            let returnValue = {}
            returnValue["Duration"] = duration;
            returnValue["Data"] = utils.parseRes(result);
            return returnValue;
        }
        catch (e)
        {
            throw (e);
        }
    }

    async function getUserCount() {
        const start = Date.now();
        try {
            const session = driver.session()

            const result = await session.run('MATCH (n:Person) RETURN COUNT(n) AS count')
            await session.close()

            const duration = Date.now() - start;
            let returnValue = {}
            returnValue["Duration"] = duration;
            returnValue["Data"] = utils.parseRes(result);
            return returnValue;
        }
        catch (e)
        {
            throw (e);
        }
    }

async function getProductCount() {
    const start = Date.now();
    try {
        const session = driver.session()
        const result = await session.run('MATCH (n:Product) RETURN COUNT(n) AS count')
        const duration = Date.now() - start;
        let returnValue = {}
        await session.close()

        returnValue["Duration"] = duration;
        returnValue["Data"] = utils.parseRes(result);
        return returnValue;
    } catch (e) {
        throw (e);
    }
}

async function getFollowersCount() {
    const start = Date.now();
    try {
        const session = driver.session()
        const result = await session.run('MATCH (:Person)-[n:followedBy]->(:Person) RETURN COUNT(n) AS count')
        const duration = Date.now() - start;
        let returnValue = {}
        await session.close()
        returnValue["Duration"] = duration;
        returnValue["Data"] = utils.parseRes(result);
        return returnValue;
    } catch (e) {
        throw (e);
    }
}

async function getPurchasedCount() {
    const start = Date.now();
    try {
        const session = driver.session()
        const result = await session.run('MATCH (:Person)-[n:havePurchased]->(:Product) RETURN COUNT(n) AS count')
        const duration = Date.now() - start;
        let returnValue = {}
        await session.close()

        returnValue["Duration"] = duration;
        returnValue["Data"] = utils.parseRes(result);
        return returnValue;
    } catch (e) {
        throw (e);
    }
}


module.exports = {
    getSalesProductByNetwork: getSalesProductByNetwork,
    getSaleForProductByNetwork: getSaleForProductByNetwork,
    getProductVirality: getProductVirality,
    getUserCount: getUserCount,
    getProductCount: getProductCount,
    getPurchasedCount: getPurchasedCount,
    getFollowersCount: getFollowersCount
}
