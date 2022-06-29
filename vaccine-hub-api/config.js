require("dotenv").config();
require("colors");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

function getDataBaseUri(){
    const dbUser = process.env.DATABASE_USER || "postgres";
    const dbPass = process.env.DATABASE_Pass ? encodeURI(process.env.DATABASE_Pass) : "postgres";
    const dbHost = process.env.DATABASE_Host || "localhost";
    const dbPort = process.env.DATABASE_Port || "5432";
    const dbName = process.env.DATABASE_Name || "vaccine_hub";

    return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}

const BCRYPT_WORK_FACTOR = 13;

console.log("Vaccine hub config:".red)
console.log("Port: ".blue, PORT)
console.log("Database URI:".blue, getDataBaseUri())
console.log("----".gray);



module.exports = {
    PORT,
    getDataBaseUri,
    BCRYPT_WORK_FACTOR
}