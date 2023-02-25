const neo4j = require('neo4j-driver')

const driver = neo4j.driver('bolt://neo4j:7687', neo4j.auth.basic('neo4j', 'neo4jneo4j'))


module.exports.driver = driver;
