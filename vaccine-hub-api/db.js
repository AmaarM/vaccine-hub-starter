const { Client } = require("pg");
const { getDataBaseUri } = require("./config");

const db = new Client({ connectionString: getDataBaseUri() });


db.connect((err) => {
    if(err){
        console.error("connection error".red, err.stack)
    }
    else{
        console.log("Successfully connected to postgres db!".blue);
    }
})


module.exports = db;