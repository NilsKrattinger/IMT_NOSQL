async function insertUsers(nbUsersToInsert) {
    const start = Date.now();
    try {
        result = [];
        result.push(await session.run(`MATCH (p:Person) 
        WITH COUNT(p) as n 
        UNWIND range(n+1, n+$nbNewUsers) as id
        CREATE (a:Person {name:id});`,
            {nbNewUsers:nbUsersToInsert}
        ))
        result.push(await session.run(`MATCH (p:Person)
        WITH COUNT(p) as n
        MATCH (p:Person)
        WHERE p.name > n-$nbNewUsers
        UNWIND p as i
            WITH i, n
            UNWIND RANGE(0, toInteger(RAND() * 20)) as j
                WITH i, toInteger(RAND() * n) + 1 as k
                MATCH (m:Person {name:k})
                WHERE i<>m AND NOT EXISTS((m)-[:followedBy]->(i))
                CREATE (m)-[:followedBy]->(i);`,
            {nbNewUsers:nbUsersToInsert}
        ))
        result.push(await session.run(`MATCH (p:Person)
        WITH COUNT(p) AS n
        MATCH (p:Person)
        WHERE p.name > n-$nbNewUsers
        UNWIND p as i
            WITH i
            MATCH (pr:Product)
            WITH i, COUNT(pr) AS n
            UNWIND RANGE(0, toInteger(RAND() * 5)) as j
                WITH i, toInteger(RAND() * n) + 1 as k
                MATCH (m:Product {name:k})
                WHERE i<>m AND NOT EXISTS((i)-[:havePurchased]->(m))
                CREATE (i)-[:havePurchased]->(m);`,
            {nbNewUsers:nbUsersToInsert}
        ))
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
async function insertProducts(nbProducsToInsert) {
    const start = Date.now();
    try {
        const result =await session.run(`MATCH (p:Product) 
        WITH COUNT(p) as n 
        UNWIND range(n+1, n+$nbNewProducts) as id
        CREATE (a:Product {name:id});`,
            {nbNewProducts:nbProducsToInsert}
        );

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
