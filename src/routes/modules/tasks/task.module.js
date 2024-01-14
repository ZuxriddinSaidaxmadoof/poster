const {Router} = require("express");
const router = Router();
const {UserService} = require("./task.service.js");
const {UserController} = require("./task.controller.js")
const {AuthorizationMiddleware} = require("../../../lib/midleware.js")

const midlware = new AuthorizationMiddleware();
const service = new UserService();
const controller = new UserController(service);

router.get("/:user_id", midlware.checkUser, midlware.userRole, async(req,res) => {
    const data = await controller.getTasks(req,res);
    res.status(data.statusCode || 500).json(data.data.rows)
})

router.post("/create", async(req,res) => {
    const data = await controller.createTask(req,res);
    res.status(data.statusCode || 500).json(data)
})

router.put("/update/:taskId", async(req,res) => {
    const data = await controller.changeTaskDone(req,res);
    res.status(data.statusCode || 500).json(data);
})

router.delete("/delete/:taskId", async(req,res) => {
    const data = await controller.deleteTask(req,res);
    res.status(data.statusCode || 500).json(data);
})


module.exports = {router};

