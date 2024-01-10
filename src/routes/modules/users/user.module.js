const {Router} = require("express");
const router = Router();
const {UserService} = require("./user.service.js");
const {UserController} = require("./user.controller.js")
const {AuthorizationMiddleware} = require("../../../lib/midleware.js")

const midlware = new AuthorizationMiddleware();
const service = new UserService();
const controller = new UserController(service);

router.get("/users", midlware.checkUser, midlware.userRole, async(req,res) => {
    const data = await controller.getAllUsers(req,res);
    res.status(data.statusCode || 500).json(data.data.rows)
})

router.post("/register", async(req,res) => {
    const data = await controller.register(req,res);
    res.status(data.statusCode || 500).json(data)
})

router.post("/login", async(req,res) => {
    const data = await controller.login(req,res);
    res.status(data.statusCode || 500).json(data)
})


module.exports = {router};

