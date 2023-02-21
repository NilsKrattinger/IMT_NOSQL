const {Pool} = require("pg");
const pgPool = new Pool({
    user: "postgres",
    host: "database",
    database: "nosql",
    password: "postgres",
    port: "5432",
});


module.exports.pgPool = pgPool;
