const { ResData } = require("./resData");
const { verifyToken } = require("./jwt.js");
const path = require("path");
// const { DataSource } = require("./dataSource.js");
const {SqlService} = require("../database/service_db.js")

const dbService = new SqlService();

class AuthorizationMiddleware {
  async adminRole(req, res, next) {
    try {

      const userId = req.userId;
  
      const user = await dbService.getOneById(userId.id)
      
      const foundUser = user?.rows[0]; 
  
      if (foundUser && "super" === foundUser.role) {
        req.user = user;
        return next();
      } else {
        const resData = new ResData("not access", 403);
  
        return res.status(resData.statusCode).json(resData);
      }
  
    } catch (error) {
      console.log("error :", error);
      const resData = new ResData("You don't have access", 403);
      res.status(resData.statusCode).json(resData);
    }
  }

  async userRole(req, res, next) {
    try {

    const userId = req.userId;

    const user = await dbService.getOneById(userId.id)

    const foundUser = user?.rows[0]; 

    if (foundUser && "user" === foundUser.role) {
      req.user = user;
      return next();
    } else {
      const resData = new ResData("not access", 403);

      return res.status(resData.statusCode).json(resData);
    }

  } catch (error) {
    console.log("error :", error);
    const resData = new ResData("You don't have access", 403);
    res.status(resData.statusCode).json(resData);
  }
  }

  checkUser(req, res, next) {
    try {
      const token = req.headers.token;

      const userId = verifyToken(token);

      req.userId = userId;
      next();
    } catch (error) {
      console.log("error :", error);
      const resData = new ResData("invalid token", 401);
      res.status(resData.statusCode).json(resData);
    }
  }
}

module.exports = { AuthorizationMiddleware };
