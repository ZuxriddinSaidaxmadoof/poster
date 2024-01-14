const pool = require("./config_db.js");


 class SqlService{
  
    async getAllUsers(){
        return await pool.query("SELECT * FROM users;")
    }
    
    async getOneById(id){
      try{
        return await pool.query(`SELECT * FROM users WHERE id = $1;`, [id])
      }catch(err){
        return  err;
      }
    }

    async getOneByGmail(gmail){
      return await pool.query(`SELECT * FROM users WHERE gmail = $1;`, [gmail]);
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
      return await pool.query(`UPDATE users SET role = 'super' where id = $1;`, [id]);
    }

    async deleteUser(id){
        return await pool.query(`DELETE FROM users WHERE id = $1;`, [id]);
    }

    async getCreatedDate(id){
      return await pool.query(`SELECT EXTRACT(DAYS FROM (AGE(NOW(), created_at))) FROM users WHERE id = $1;`, [id]);
    }

}

class TasckServiceDb{
  async getTasksByUserId(userId){
    return await pool.query('SELECT * FROM tasks WHERE user_id = $1;',[userId]);
  }
  async getTaskById(taskId){
    try{
      return await pool.query('SELECT * FROM tasks WHERE id = $1;',[taskId]);
    }catch(err){
      return err;
    }
  }
  async createTaskForOne(dto){
    return await pool.query('insert into tasks (user_id, title) values ( $1, $2 ) RETURNING *;', [dto.userId, dto.title]);
  }
  async changeIsDone(what, taskId){
    return await pool.query('UPDATE tasks SET is_done = $1 where id = $2 RETURNING *;', [what, taskId]);
  }
  async deleteTask(taskId){
    try{
      return await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *;', [taskId]);
    }catch(err){
      return err;
    }
  }

}

module.exports = {SqlService, TasckServiceDb}
