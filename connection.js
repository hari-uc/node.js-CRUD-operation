const {Client} = require('pg')

let client = new Client({
    host:"localhost",
    user:"postgres",
    password:"admin",
    database:"ProductList",
    port:"5432"
    
});

module.exports=client;