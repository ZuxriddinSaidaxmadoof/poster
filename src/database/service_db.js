const pool = require("./config_db.js");


 class SqlService{
  
    async getAllUsers(){
        return await pool.query("SELECT * FROM users;")
    }
    
    async getOneById(id){
      return await pool.query(`SELECT * FROM users WHERE id = '${id}';`)
    }

    async getOneByGmail(gmail){
      return await pool.query(`SELECT * FROM users WHERE gmail = '${gmail}';`)
    }

    async createNewUser(dto){

            const newDataRow = {
                full_name: dto.fullName,
                gmail: dto.gmail,
                password: dto.password,
                role: "user"
              };
              
              const insertQuery = {
                text: 'INSERT INTO users (full_name, gmail, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
                values: [newDataRow.full_name, newDataRow.gmail, newDataRow.password, newDataRow.role],
              };

              return await pool.query(insertQuery);              

    }

    async updateUserById(id){
      return await pool.query(`UPDATE users SET role = 'super' where id = ${id};`)
    }

    async deleteUser(id){
        return await pool.query(`DELETE FROM users WHERE id = ${id};`);
    }

    async getCreatedDate(id){
      return await pool.query(`SELECT EXTRACT(DAYS FROM (AGE(NOW(), created_at))) FROM users WHERE id = ${id};`)
    }

}

module.exports = {SqlService}
