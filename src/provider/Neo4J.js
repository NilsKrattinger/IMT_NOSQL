const neo4j = require('neo4j-driver')

const driver = neo4j.driver('localhost', neo4j.auth.basic('neo4J', 'neo4J'))
const session = driver.session()


module.exports.session = session;
