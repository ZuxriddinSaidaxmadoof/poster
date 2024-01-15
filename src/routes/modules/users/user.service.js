const {SqlService} = require("../../../database/service_db.js");
const {ResData} = require("../../../lib/resData.js");
const {getToken, verifyToken} = require("../../../lib/jwt.js")
const {hashPasword, verifyPassword} = require("../../../lib/bcrypt.js");


class UserService{
    async getAllUsers(){
        const sqlService = new SqlService();
        const data = await sqlService.getAllUsers();

        return new ResData("All users", 200, data);
    }

    async registerService(dto,req,res){
        try{

            dto.password = await hashPasword(dto.password);

            const sqlService = new SqlService();
            const data = await sqlService.createNewUser(dto);
            const token = await getToken(...data.rows)
            // await res.headers.set("token", token)
            res.setHeader('token', token);
            return new ResData("User created", 201, data.rows);
        }catch(err){
            console.log(err);
            return new ResData(err.message || "something went wrong", 500, null, err);
        }
    }
    async loginService(dto, req,res){
        try{
            const sqlService = new SqlService();

            const currentUser = await sqlService.getOneByGmail(dto.gmail);
            const user = currentUser.rows[0];
            const checkLogin = await verifyPassword(dto.password, user.password);
            if(!checkLogin){
                return new ResData("Wrong password", 403)
            }
            const token = await getToken(user);
            res.setHeader('token', token);
            return new ResData("You successfully loged in", 200, user);
        }catch(err){
            console.log(err);
            return new ResData(err.message || "something went wrong", 500, null, err);
        }
    }

    async deleteUser(req,res){
        try{
            const userId = req.params.userId; 
            const sqlService = new SqlService();

            const currentUser = await sqlService.getOneById(userId);
            if(currentUser.error || currentUser.rows == ""){
                return new ResData("User not found", 404, currentUser.rows);
            }

            const deletedUser = await sqlService.deleteUser(userId)
            return new ResData("User deleted successfully", 200, deletedUser.rows);
        }catch(err){
            console.log(err);
            return new ResData(err.message || "something went wrong", 500, null, err);
        }
    }
}

module.exports = {UserService};
