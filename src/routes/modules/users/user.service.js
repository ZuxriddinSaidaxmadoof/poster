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
            if(!dto.fullName || !dto.gmail || !dto.password){
                return new ResData("fullName, gmail, password must be require")
            }

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
}

module.exports = {UserService};
