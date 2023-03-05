const {driver} = require('../provider/Neo4J')
const utils = require('../utils/neo4j-utils')

async function getSalesProductByNetwork(userId) {
    const start = Date.now();
    try {
        const session = driver.session()
        const result = await session.run('MATCH (a:Person{id:'+userId+'})-[r1:followedBy *..4]->(b:Person)-[r2:haveBought]->(c:Product) WHERE a<>b WITH DISTINCT a, b, c WITH c, COUNT(c) as d RETURN c, d')
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

            const result = await session.run('MATCH (a:Person{id:'+userId+'})-[r1:followedBy *..4]->(b:Person)-[r2:haveBought]->(c:Product {id:'+productName+'}) WHERE a<>b WITH DISTINCT a, b, c WITH c, COUNT(c) as d RETURN c, d')
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

            const result = await session.run('MATCH (n:Person)-[:followedBy * '+circleSize+'..' + circleSize+']->(p:Person)-[:haveBought]->(c:Product {name:'+ productName +'}) WHERE (n)-[:haveBought]->(c) AND n<>p RETURN p',)
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


async function createUsers(nbUsersToInsert) {
    const start = Date.now();
    let result = [];

    try {
        let session = driver.session()
        result.push(await session.run(`MATCH (p:Person) 
        WITH COUNT(p) as n 
        UNWIND range(n+1, n+`+nbUsersToInsert+`) as id
        CREATE (a:Person {name:id});`))
        result.push(await session.run(`MATCH (p:Person)
        WITH COUNT(p) as n
        MATCH (p:Person)
        WHERE p.name > n-`+nbUsersToInsert+`
        UNWIND p as i
            WITH i, n
            UNWIND RANGE(0, toInteger(RAND() * 20)) as j
                WITH i, toInteger(RAND() * n) + 1 as k
                MATCH (m:Person {name:k})
                WHERE i<>m AND NOT EXISTS((m)-[:followedBy]->(i))
                CREATE (m)-[:followedBy]->(i);`))
        await session.close()

        session = driver.session()
        result.push(await session.run(`MATCH (p:Person)
        WITH COUNT(p) AS n
        MATCH (p:Person)
        WHERE p.name > n-`+ nbUsersToInsert +`
        UNWIND p as i
            WITH i
            MATCH (pr:Product)
            WITH i, COUNT(pr) AS n
            UNWIND RANGE(0, toInteger(RAND() * 5)) as j
                WITH i, toInteger(RAND() * n) + 1 as k
                MATCH (m:Product {name:k})
                WHERE i<>m AND NOT EXISTS((i)-[:havePurchased]->(m))
                CREATE (i)-[:havePurchased]->(m);`
        ));
        await session.close()

        const duration = Date.now() - start;
        let returnValue = {}
        returnValue["Duration"] = duration;
        returnValue["Data"] = result;
        return returnValue;
    } catch (e) {
        throw (e);
    }
}


async function createProduct(nbProducsToInsert) {
    const start = Date.now();
    try {
        const session = driver.session()

        const result =await session.run(`MATCH (p:Product) 
        WITH COUNT(p) as n 
        UNWIND range(n+1, n+`+nbProducsToInsert +`) as id
        CREATE (a:Product {name:id});`,
        );
        await session.close()
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
    getUserCount: getUserCount,
    getProductCount: getProductCount,
    getPurchasedCount: getPurchasedCount,
    getFollowersCount: getFollowersCount,
    createUsers:createUsers,
    createProduct:createProduct
}
