const Client = require('pg').Pool ;
const client = new Client({
    user: "postgres",
    password: "admin",
    database: "bousta",
    host: "localhost",
    port: 5432
});



module.exports = client ;


