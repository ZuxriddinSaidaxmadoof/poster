const {ResData} = require("../../../lib/resData.js")

class UserController{
    #service
    constructor(service){
        this.#service = service;
    }
    
    async getAllUsers(req,res){
        try{
            return await this.#service.getAllUsers()
        }catch(err){
            console.log(err);
            return err;
        }
    }

    async register(req,res){
        const dto = req.body;
        try{
            if(!dto.fullName || !dto.gmail || !dto.password){
                return new ResData("fullName, gmail, password must be require")
            }
            return await this.#service.registerService(dto, req,res);
            
        }catch(err){
            console.log(err);
            return err;
        }
    }

    async login(req,res){
        try{
            const dto = req.body;
            if(!dto.gmail || !dto.password){
                return new ResData("gmail and password must be required")
            }
            return await this.#service.loginService(dto, req,res)
        }catch(err){
            console.log(err);
            return err;
        }
    }

    async deleteUser(req,res){
        try{
            return await this.#service.deleteUser(req,res)
        }catch(err){
            console.log(err);
            return err;
        }
    }
}

module.exports = {UserController};