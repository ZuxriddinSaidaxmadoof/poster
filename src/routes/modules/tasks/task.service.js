const {SqlService, TasckServiceDb} = require("../../../database/service_db.js");
const {ResData} = require("../../../lib/resData.js");
const {getToken, verifyToken} = require("../../../lib/jwt.js")
const {hashPasword, verifyPassword} = require("../../../lib/bcrypt.js");


class UserService{
    async getTasks(userId){
        const sqlService = new TasckServiceDb();
        const data = await sqlService.getTasksByUserId(userId);

        return new ResData("All tasks for one user", 200, data);
    }

    async createTask(req,res){
        try{
            const dto = req.body;
            const sqlService = new SqlService();
            const user = await sqlService.getOneById(dto.userId);
            console.log(user);

            if(user.rows){
                const taskService = new TasckServiceDb;
                const data = await taskService.createTaskForOne(dto);
                return new ResData("task created", 201, data.rows);
            }
            return new ResData("User not found", 500);

        }catch(err){
            console.log(err);
            return new ResData(err.message || "User not found on service", 500, null, err);
        }
    }
    async update(req,res){
        try{
            const taskId = req.params.taskId;
            const taskService = new TasckServiceDb();

            
            const {rows} = await taskService.getTaskById(taskId);
            if(rows){
                const target = !(rows[0].isDone);
                const data = await taskService.changeIsDone(target, taskId);
                return new ResData(`Task updated to ${target}`, 200, data.rows);
            }
            return new ResData("Task not found", 404);
        }catch(err){
            console.log(err);
            return new ResData(err.message || "something went wrong", 500, null, err);
        }
    }

    async delete(req,res){
        try{
            const taskId = req.params.taskId;
            const taskService = new TasckServiceDb();
            
            const task = await taskService.getTaskById(taskId);
            if(task.rowCount){
                const data = await taskService.deleteTask(taskId);
                return new ResData(`Task deleted`, 200, data.rows);
            }
            return new ResData("Task not found", 404);
        }catch(err){
            return new ResData(err.message || "something went wrong", 500, null, err);
        }
    }
}

module.exports = {UserService};
