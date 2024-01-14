const {ResData} = require("../../../lib/resData.js")

class UserController{
    #service
    constructor(service){
        this.#service = service;
    }
    
    async getTasks(req,res){
        try{
            const userId = req.params.user_id;
            return await this.#service.getTasks(userId)
        }catch(err){
            console.log(err);
            return err;
        }
    }

    async createTask(req,res){
        const dto = req.body;
        try{
            if(!dto.userId || !dto.title){
                return new ResData("userId and title must be require");
            }
            return await this.#service.createTask(req,res);
            
        }catch(err){
            console.log(err);
            return err;
        }
    }

    async changeTaskDone(req,res){
        try{
            return await this.#service.update(req,res)
        }catch(err){
            console.log(err);
            return err;
        }
    }

    async deleteTask(req,res){
        try{
            return await this.#service.delete(req,res)
        }catch(err){
            console.log(err);
            return err;
        }
    }
}

module.exports = {UserController};