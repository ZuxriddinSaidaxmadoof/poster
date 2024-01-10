require("dotenv").config();

const port = process.env.SERVER_PORT
const db_host = process.env.DB_HOST
const db_username = process.env.DB_USERNAME
const db_password = process.env.DB_PASSWORD
const db_port = process.env.DB_PORT
const db_name = process.env.DB_NAME
const jwtKey = process.env.JWT_KEY

module.exports = {port, db_host, db_username, db_password, db_port, db_name, jwtKey};

