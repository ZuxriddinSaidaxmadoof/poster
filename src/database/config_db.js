const {Pool} = require("pg")
const {db_username, db_host, db_name, db_password, db_port} = require("../../config/index.js")

const pool = new Pool({
    user: db_username,
    host: db_host,
    database: db_name,
    password: db_password,
    port: db_port || 5432,
  });


module.exports = pool;
