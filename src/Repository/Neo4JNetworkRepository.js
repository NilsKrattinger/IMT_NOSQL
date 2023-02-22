const {session} = require('../provider/Neo4J')


async function getSalesProductByNetwork(userName) {
    const start = Date.now();
    try {
        const result = await session.run('MATCH (a:Person{name:name})-[r1:followedBy *..4]->(b:Person)-[r2:haveBought]->(c:Product) WHERE a<>b WITH DISTINCT a, b, c WITH c, COUNT(c) as d RETURN c, d,',
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

        returnValue["Duration"] = duration;
        returnValue["Data"] = result;
        return returnValue;
    }


    async function getProductVirality(productName) {
        const start = Date.now();


        returnValue["Duration"] = duration;
        returnValue["Data"] = result;
        return returnValue;
    }


    module.exports = {
        getSalesProductByNetwork: getSalesProductByNetwork,
        getSaleForProductByNetwork: getSaleForProductByNetwork,
        getProductVirality: getProductVirality
    }
