const {session} = require('../provider/Neo4J')


async function getSalesProductByNetwork(userName) {
    const start = Date.now();
    try {
        const result = await session.run('MATCH (a:Person{name:$name})-[r1:followedBy *..4]->(b:Person)-[r2:haveBought]->(c:Product) WHERE a<>b WITH DISTINCT a, b, c WITH c, COUNT(c) as d RETURN c, d,',
            {name: userName}
        )
        const duration = Date.now() - start;
        let returnValue = {}
        returnValue["Duration"] = duration;
        returnValue["Data"] = result;
        return returnValue;
    }
    catch (e)
    {
        throw (e);
    }
}
    async function getSaleForProductByNetwork(userId, productName) {
        const start = Date.now();
        try {
            const result = await session.run('MATCH (a:Person{name:$username})-[r1:followedBy *..4]->(b:Person)-[r2:haveBought]->(c:Product {name:$product_name}) WHERE a<>b WITH DISTINCT a, b, c WITH c, COUNT(c) as d RETURN c, d,',
                {user_name: userName, product_name:productName}
            )
            const duration = Date.now() - start;
            let returnValue = {}
            returnValue["Duration"] = duration;
            returnValue["Data"] = result;
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
            const result = await session.run('MATCH (n:Person)-[:followedBy *$circle_size..$circle_size]->(p:Person)-[:haveBought]->(c:Product {name:$product_name}) WHERE (n)-[:haveBought]->(c) AND n<>p RETURN p',
                {product_name:productName,circle_size:circleSize}
            )
            const duration = Date.now() - start;
            let returnValue = {}
            returnValue["Duration"] = duration;
            returnValue["Data"] = result;
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
            const result = await session.run('MATCH (n:Person) RETURN COUNT(n)')
            const duration = Date.now() - start;
            let returnValue = {}
            returnValue["Duration"] = duration;
            returnValue["Data"] = result;
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
            const result = await session.run('MATCH (n:Product) RETURN COUNT(n)')
            const duration = Date.now() - start;
            let returnValue = {}
            returnValue["Duration"] = duration;
            returnValue["Data"] = result;
            return returnValue;
        }
        catch (e)
        {
            throw (e);
        }
    }

    async function getFollowersCount() {
        const start = Date.now();
        try {
            const result = await session.run('MATCH (:Person)-[r:followedBy]->(:Person) RETURN COUNT(r)')
            const duration = Date.now() - start;
            let returnValue = {}
            returnValue["Duration"] = duration;
            returnValue["Data"] = result;
            return returnValue;
        }
        catch (e)
        {
            throw (e);
        }
    }

    async function getPurchasedCount() {
        const start = Date.now();
        try {
            const result = await session.run('MATCH (:Person)-[r:havePurchased]->(:Product) RETURN COUNT(r)')
            const duration = Date.now() - start;
            let returnValue = {}
            returnValue["Duration"] = duration;
            returnValue["Data"] = result;
            return returnValue;
        }
        catch (e)
        {
            throw (e);
        }
    }


    module.exports = {
        getSalesProductByNetwork: getSalesProductByNetwork,
        getSaleForProductByNetwork: getSaleForProductByNetwork,
        getProductVirality: getProductVirality,
        getUserCount:getUserCount,
        getProductCount:getProductCount,
        getPurchasedCount:getPurchasedCount,
        getFollowersCount:getFollowersCount
    }
